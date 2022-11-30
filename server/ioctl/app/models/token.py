from sqlalchemy import Column, Integer, BigInteger

from app.db.base_class import Base


class RefreshToken(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    validity_timestamp = Column(BigInteger, index=True)
