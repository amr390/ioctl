from datetime import datetime, timedelta

from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.models.token import RefreshToken
from app.models.user import User


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


ALGORITHM = "HS256"


def create_access_token(
    user: User, expires_delta: Union[timedelta, None] = None
) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    role_names = [r.name for r in user.roles]

    to_encode = {"exp": expire, "sub": str(user.id), "roles": role_names}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def create_refresh_token(db: Session, token: schemas.TokenCreate) -> RefreshToken:
    return crud.token.create(db, obj_in=token)


def get_existing_refresh_token_by_user_id(db: Session, user_id: int) -> RefreshToken | None:
    return crud.token.get_by_user_id(db, user_id=user_id)

def get_existing_refresh_token_by_id(db: Session, token_id: int) -> RefreshToken | None:
    return crud.token.get(db, id=token_id)


def delete_token(db: Session, token_id: int) -> None:
    crud.token.delete(db, token_id=token_id)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
