from typing import TYPE_CHECKING, Optional

from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.schema import Table

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: 401

mission_hunters_table = Table(
    "mission_hunters",
    Base.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("mission_id", ForeignKey("mission.id")),
)


class Mission(Base):
    __tablename__ = "mission"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[Optional[str]] = mapped_column(index=True)
    description: Mapped[Optional[str]]
    # TODO: this might need to be moved to its own entity model.
    realm: Mapped[Optional[str]]
    leader_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    hunters: Mapped["User"] = relationship(secondary=mission_hunters_table)
