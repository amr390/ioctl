from typing import TYPE_CHECKING, Optional

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.schema import Table
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: 401

quest_hunters_table = Table(
    "quest_hunters",
    Base.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("quest_id", ForeignKey("quest.id")),
)


class Quest(Base):
    __tablename__ = "squad"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[Optional[str]] = Column(String, index=True)
    description = Column(String)
    mission = Column(Integer, ForeignKey("mission.id"))
    hunters: Mapped["User"] = relationship(secondary=quest_hunters_table)
