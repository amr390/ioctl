from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException, Security
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.core.role_checker import RoleChecker
from app.utils import send_new_account_email

router = APIRouter()
user_not_exists = HTTPException(
    status_code=404,
    detail="The user with this username does not exist in the system",
)


user_already_exists = HTTPException(
    status_code=400,
    detail="The user with this username already exists in the system",
)


@router.get("", response_model=List[schemas.User])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Security(
        deps.get_current_active_user,
        scopes=[
            RoleChecker.HEAD["name"],
        ],
    ),
) -> Any:
    """
    Retriever user list.
    """
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("", response_model=schemas.User)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new user.
    """
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise user_not_exists
    user = crud.user.create(db, obj_in=user_in)
    if settings.EMAILS_ENABLED and user_in.email:
        send_new_account_email(
            email_to=user_in.email, username=user_in.email, password=user_in.password
        )
    return user


@router.post("/open", response_model=schemas.User)
def create_user_open(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(...),
    email: EmailStr = Body(...),
    full_name: str = Body(None),
) -> Any:
    """
    Create new user without the need to be logged in.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open user registration is forbidden on this server",
        )
    user = crud.user.get_by_email(db, email=email)
    if user:
        raise user_already_exists
    user_in = schemas.UserCreate(password=password, email=email, full_name=full_name)
    user = crud.user.create(db, obj_in=user_in)
    return user


@router.put("/me", response_model=schemas.User)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(None),
    full_name: str = Body(None),
    email: EmailStr = Body(None),
    hunter: str = Body(None),
    current_user: models.User = Security(
        deps.get_current_active_user,
        scopes=[],
    ),
) -> Any:
    """
    Update own user.
    """
    current_user_data = jsonable_encoder(current_user)
    # add this entry to the dictionary to use HunterUpdate schema
    current_user_data["user_id"] = current_user_data["id"] 
    user_in = schemas.UserUpdate(**current_user_data)
    hunter_in = schemas.HunterUpdate(**current_user_data)

    if password is not None:
        user_in.password = password
    if full_name is not None:
        user_in.full_name = full_name
    if email is not None:
        user_in.email = email
    if hunter is not None:
        user_in.hunter = hunter

    user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
    hunter = crud.hunter.update(db, db_obj=user.profile, obj_in = hunter_in)
    return user


@router.get("/me", response_model=schemas.User)
def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Security(
        deps.get_current_active_user,
        scopes=[
            RoleChecker.HEAD["name"],
        ],
    ),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.get("/{user_id}", response_model=schemas.User)
def read_user_by_id(
    user_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific user by id.
    """
    user = crud.user.get(db, id=user_id)
    if user == current_user:
        return user
    if not crud.user.is_superuser(current_user):
        raise user_already_exists
    return user


@router.put("/{user_id}", response_model=schemas.User)
def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a user.
    """
    user = crud.user.get(db, id=user_id)
    if not user:
        raise user_not_exists
    user = crud.user.update(db, db_obj=user, obj_in=user_in)
    return user


@router.get("/{user_id}/activate/{token}", response_model=schemas.User)
def activate_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    token: str,
) -> Any:

    user: Optional[models.User] = crud.user.get(db=db, id=user_id)
    if not user:
        raise user_not_exists
    if user.is_active:
        raise user_already_exists
    if user.hunter == 'SOLO':
        clan = crud.clan.get_by_user(db=db, owner_id=user.id)
        if not clan:
            clan = crud.clan.create_default(db=db, owner_id=user.id)

        squad = crud.squad.get_by_user(db=db, leader_id=user.id)
        if not squad:
            squad = crud.squad.create_default(db=db, clan_id=clan.id, user=user)
        mission = crud.mission.get_by_user(db=db, leader_id=user.id)
        if not mission:
            crud.mission.create_default(db=db, squad=squad, user=user)

    user: models.User = crud.user.activate(db, user_id, token)
    return user


@router.get("/{user_email}/resendToken", response_model=schemas.User)
def resend_token(
    *,
    db: Session = Depends(deps.get_db),
    user_email: str,
) -> Any:
    user: models.User = crud.user.get_by_email(user_email)
    if settings.EMAILS_ENABLED and user:
        send_new_account_email(email_to=user_email, username=user_email)
    return crud.user.activate(db, user_id, token)
