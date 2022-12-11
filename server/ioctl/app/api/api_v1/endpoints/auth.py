from datetime import datetime, timedelta
import uuid
from typing import Any

from fastapi import APIRouter, Body, Cookie, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    get_existing_refresh_token_by_user_id,
    get_existing_refresh_token_by_id,
    delete_token,
    get_password_hash,
)
from app.models.user import User
from app.utils import (
    generate_password_reset_token,
    send_reset_password_email,
    verify_password_reset_token,
)

router = APIRouter()


# login/access-token
@router.post("/auth/login", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(status_code=400, detail="Incorrent email or passoword")
    elif not crud.user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")

    refresh_token = get_existing_refresh_token_by_user_id(db, user.id)
    current_timestamp = round(datetime.now().timestamp())  # seconds
    token_still_valid = False
    if refresh_token is not None:
        token_still_valid = refresh_token.validity_timestamp > current_timestamp

    if refresh_token is None or not token_still_valid:
        if refresh_token is not None and token_still_valid is False:
            delete_token(db, token_id=refresh_token.id)
        seconds_till_expiration = settings.REFRESH_TOKEN_EXPIRE_MINUTES * 60
        new_token_data = schemas.TokenCreate(
            id=str(uuid.uuid4()),
            user_id=user.id,
            validity_timestamp=current_timestamp * seconds_till_expiration,
        )
        refresh_token = create_refresh_token(db, new_token_data)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user=user, expires_delta=access_token_expires)
    access_token_expires_ms = (
        current_timestamp + settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60 * 1000
    )

    response = JSONResponse(
        content={
            "access_token": access_token,
            "token_type": "bearer",
            "token_expiry": access_token_expires_ms,
        }
    )

    refresh_token_expires = settings.REFRESH_TOKEN_EXPIRE_MINUTES * 60 * 1000
    response.set_cookie(
        key="ioctl_rt",
        value=refresh_token.id,
        expires=refresh_token_expires,
        httponly=True,
    )

    return response


# login/refresh
@router.post("/auth/refresh", response_model=schemas.Token)
def refresh_token(
    db: Session = Depends(deps.get_db),
    ioctl_rt: str = Cookie(None, description="Refresh token Id"),
):

    tokenFromDb = get_existing_refresh_token_by_id(db, ioctl_rt)

    if tokenFromDb is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid refresh token",
        )

    current_timestamp = round(datetime.now().timestamp())

    if tokenFromDb.validity_timestamp < current_timestamp:
        delete_token(db, tokenFromDb.id)
        raise HTTPException(
            status_code=400,
            detail="Invalid refresh token",
        )
    user = crud.user.get(db, id=tokenFromDb.user_id)
    # if user is None or user.disabled is True:
    if user is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid user",
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user=user, expires_delta=access_token_expires)

    response = JSONResponse(
        content={
            "access_token": access_token,
            "token_type": "bearer",
            "token_expiry": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        }
    )
    return response


# auth/register
@router.post("/auth/register", response_model=schemas.User)
def test_token() -> Any:
    """
    Test access Token
    """

    return True


# auth/test-token
@router.post("/auth/validate", response_model=schemas.User)
def test_token() -> Any:
    """
    Test access Token
    """

    return True


@router.post("/password-recovery/{email}", response_model=schemas.Msg)
def recovery_password(email: str, db: Session = Depends(deps.get_db)) -> Any:
    """
    Password recovery
    """
    user = crud.user.get_by_email(db, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    send_reset_password_email(
        email_to=user.email, email=email, token=password_reset_token
    )
    return {"msg": "Password recovery email sent"}


@router.post("/reset-password/", response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Reeset Password
    """
    email = verify_password_reset_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = crud.user.get_by_email(db, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    elif not crud.user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    hashed_password = get_password_hash(new_password)

    user.hashed_password = hashed_password
    db.add(user)
    db.commit()
    return {"msg": "Passrod updated successfully"}
