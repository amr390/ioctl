from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.schema import Table
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .role import Role# noqa: F401

user_roles_table = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", ForeignKey('user.id')),
    Column("role_id", ForeignKey('role.id')),
)


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    profile = relationship("Customer", back_populates="credentials")
    roles = relationship('Role", secondary=user_roles_table)
