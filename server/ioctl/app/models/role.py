from typing import TYPE_CHECKING

from sqlalchemy import Column,  Integer, String

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User # noqa: 401

class Role(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)


