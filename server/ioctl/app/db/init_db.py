from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.db import base  # noqa: f401


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https./github.com/tiangolo/full-stack-api-postgresql/issues/28


def create_roles(db: Session) -> None:

    roles = ["MASTER", "HEAD", "PLAYER"]

    for role_name in roles:
        role = crud.role.get_by_name(db, name=role_name)
        if not role:
            role_in = schemas.RoleCreate(
                name=role_name,
            )
            role = crud.role.create(db, obj_in=role_in)  # noqa: F841
        db.add(role)
        db.commit()


def create_user(db: Session, user_d: dict) -> None:
    user = crud.user.get_by_email(db, email=user_d["username"])
    if not user:
        user_in = schemas.UserCreate(
            email=user_d["username"],
            password=user_d["password"],
            is_superuser=user_d["super"],
        )
        user = crud.user.create(db, obj_in=user_in)  # noqa: F841
        for role_name in user_d["roles"]:
            role_head = crud.role.get_by_name(db, name=role_name)
            user.roles.append(role_head)

        db.add(user)
        db.commit()


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)
    users = [
        {
            "username": settings.FIRST_SUPERUSER,
            "password": settings.FIRST_SUPERUSER_PASSWORD,
            "roles": ["MASTER", "HEAD", "PLAYER"],
            "super": True,
        },
        {
            "username": "parzival@oasis.org",
            "password": "changethis",
            "roles": ["PLAYER"],
            "super": False,
        },
        {
            "username": "art3mis@oasis.org",
            "password": "changethis",
            "roles": ["PLAYER"],
            "super": False,
        },
        {
            "username": "hache@oasis.org",
            "password": "changethis",
            "roles": ["PLAYER"],
            "super": False,
        },
    ]

    create_roles(db)

    for user in users:
        create_user(db, user)
