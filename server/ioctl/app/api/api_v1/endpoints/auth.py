from datetime import datetime, timedelta
from typing import Any

from fastapi import APIRouter, Body, Cookie, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    get_existing_refresh_token,
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

    refresh_token = get_existing_refresh_token(db, user.id)
    current_timestamp = round(datetime.now().timestamp())  # seconds
    token_still_valid = refresh_token.validity > current_timestamp

    if refresh_token is not None and token_still_valid:
        refresh_token_id = refresh_token.id
    else:
        if refresh_token is not None and token_still_valid is False:
            delete_token(refresh_token.id)
        seconds_till_expiration = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        new_token_data = schemas.TokenCreate(
            id=uuid.uuid4(),
            user_id=user.id,
            validity=current_timestamp * seconds_till_expiration,
        )

        new_refresh_token_id = create_refresh_token(db, new_token_data)

        refresh_token_id = new_refresh_token_id

    seconds_till_expiration = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    cookie_token_expiration = current_timestamp * seconds_till_expiration
    cookie_token_expiration_in_ms = cookie_token_expiration * 60

    access_token_expires = timedelta(minues=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        delta={"sub": user.username}, expires_delta=access_token_expires
    )

    response = JSONResponse(
        content={
            "access_token": access_token,
            "token_type": "bearer",
            "token_expiry": seconds_till_expiration,
        }
    )

    response.set_cookie(
        key="ioctl-rt",
        value=refresh_token_id,
        expires=cookie_token_expiration,
        httpOnly=True,
    )

    return response
    # access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    # refresh_token_expires = timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    # return {
    #     "access_token": security.create_access_token(
    #         user, expires_delta=access_token_expires
    #     ),
    #     "refresh_token": security.create_refresh_token(
    #         user, expires_delta=refresh_token_expires
    #     ),
    #     "token_type": "bearer",
    # }


# login/refresh
@router.post("/auth/refresh", response_model=schemas.Token)
def refresh_token(user: User = Depends(deps.validate_refresh_token)) -> Any:
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


# login/test-token
@router.post("/auth/validate", response_model=schemas.User)
def test_token(current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Test access Token
    """
    return current_user


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
