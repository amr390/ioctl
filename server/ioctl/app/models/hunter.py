from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Hunter(Base):
    __tablename__ = "hunter"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    first_name: Mapped[Optional[str]] = mapped_column(index=True)
    last_name: Mapped[Optional[str]]
    email: Mapped[str] = mapped_column(index=True)
    phone: Mapped[Optional[str]]
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    credentials: Mapped["User"] = relationship(back_populates="profile")
