from typing import TYPE_CHECKING, Optional

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: 401


class Clan(Base):
    __tablename__ = "clan"
    id: Mapped[int] = mapped_column (primary_key=True, index=True)
    name: Mapped[str] = mapped_column(index=True)
    description: Mapped[Optional[str]]
    owner_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    # We don't need to make it bidirectional for now
    # owner: Mapped["User"] = relationship(back_populates="clan")
