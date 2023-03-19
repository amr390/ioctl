from sqlalchemy import BigInteger
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class RefreshToken(Base):
    __tablename__ = "refresh_token"
    id: Mapped[str] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int]
    validity_timestamp = mapped_column(BigInteger)
