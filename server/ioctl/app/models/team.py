from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.schema import Table
from sqlalchemy.orm import relationship

from app.db.base_class import Base

# if TYPE_CHECKING:
from .organization import Organization # noqa: 401

user_teams_table = Table(
    "user_teams",
    Base.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("team_id", ForeignKey("team.id")),
)


class Team(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    organization = Column(Integer, ForeignKey("organization.id"))
    users = relationship('User', secondary=user_teams_table, backref="users")

    # owner = relationship("User", back_populates="items")
