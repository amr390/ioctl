from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base

# if TYPE_CHECKING:
from .organization import Organization # noqa: 401


class Team(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    organization = Column(Integer, ForeignKey("organization.id"))

    # owner = relationship("User", back_populates="items")
