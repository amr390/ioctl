from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.schema import Table
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: 401

hunter_squads_table = Table(
    "hunter_squads",
    Base.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("squad_id", ForeignKey("squad.id")),
)


class Squad(Base):
    __tablename__ = "squad"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    clan = Column(Integer, ForeignKey("clan.id"))
    hunters = relationship('User', secondary=hunter_squads_table, backref="users")

    leader = Column(Integer, ForeignKey("user.id"))
