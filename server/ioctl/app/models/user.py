from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, VARCHAR
from sqlalchemy.schema import Table
from sqlalchemy.orm import Mapped, mapped_column, relationship
from uvicorn.config import logging

from app.db.base_class import Base

# this should be if from typing import TYPE_CHECKING but it turns out is null
from typing import Optional

# if typing.TYPE_CHECKING:
from .role import Role  # noqa: F401
from .hunter import Hunter  # noqa: F401

# from .squad import Squad


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


user_roles_table = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("role_id", ForeignKey("role.id")),
)


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    full_name: Mapped[Optional[str]] = mapped_column(index=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    hashed_password: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=True)
    is_superuser: Mapped[bool] = mapped_column(default=False)
    token: Mapped[Optional[str]] = mapped_column(String(255))
    hunter: Mapped[str] = mapped_column(String(63), default="SOLO")
    profile = relationship("Hunter", back_populates="credentials")
    roles = relationship("Role", secondary=user_roles_table)
