from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.schema import Table
from sqlalchemy.orm import relationship
from uvicorn.config import logging

from app.db.base_class import Base

# this should be if from typing import TYPE_CHECKING but it turns out is null
from .role import Role  # noqa: F401
from .customer import Customer  # noqa: F401


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


user_roles_table = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("role_id", ForeignKey("role.id")),
)


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    profile = relationship("Customer", back_populates="credentials")
    roles = relationship("Role", secondary=user_roles_table)
