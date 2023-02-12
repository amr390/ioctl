from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.db import base  # noqa: f401


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https./github.com/tiangolo/full-stack-api-postgresql/issues/28


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)

    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.user.create(db, obj_in=user_in)  # noqa: F841

    role_head = crud.role.get_by_name(db, name="HEAD")
    if not role_head:
        role_in = schemas.RoleCreate(
            name="HEAD",
        )
        role_head = crud.role.create(db, obj_in=role_in)  # noqa: F841
        user.roles.append(role_head)
        crud.user.update(db=db, db_obj=user, obj_in={})

    role_player = crud.role.get_by_name(db, name="PLAYER")
    if not role_player:
        role_in = schemas.RoleCreate(
            name="PLAYER",
        )
        role_player = crud.role.create(db, obj_in=role_in)  # noqa: F841
        user.roles.append(role_player)
        crud.user.update(db=db, db_obj=user, obj_in={})
