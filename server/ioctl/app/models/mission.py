from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Table

from app.db.base_class import Base

if TYPE_CHECKING:
    from .hunter import Hunter # noqa: 401

mission_hunters_table = Table (
    "mission_hunters",
    Base.metadata,
    Column("hunter_id", ForeignKey("hunter.id")),
    Column("mission_id", ForeignKey("mission.id")),
)
class Mission(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    # TODO: this might need to be moved to its own entity model.
    realm = Column(String)
    mission_leader = Column(Integer, ForeignKey("user.id"))
    hunters = relationship("Hunter", secondary=mission_hunters_table)
    # owner = relationship("User", back_populates="items")
