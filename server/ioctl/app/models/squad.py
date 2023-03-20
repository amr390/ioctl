from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.schema import Table
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: 401
    from .mission import Mission
    from .clan import Clan

hunter_squads_table = Table(
    "hunter_squads",
    Base.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("squad_id", ForeignKey("squad.id")),
)

squad_missions_table = Table(
    "squad_missions",
    Base.metadata,
    Column("squad_id", ForeignKey("squad.id")),
    Column("mission_id", ForeignKey("mission.id")),
)


class Squad(Base):
    __tablename__ = "squad"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    clan_int: Mapped[int] = mapped_column(ForeignKey("clan.id"))
    clan: Mapped["Clan"] = relationship("Clan", secondary=hunter_squads_table, backref="squads")
    hunters: Mapped[List["User"]] = relationship("User", secondary=hunter_squads_table, backref="users")
    missions: Mapped[List["Mission"]] = relationship("Mission", secondary=hunter_squads_table, backref="squad")
    leader_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    leader : Mapped["User"] = relationship("User")
