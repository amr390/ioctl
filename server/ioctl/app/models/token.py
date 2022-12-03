from sqlalchemy import Column, Integer, BigInteger, VARCHAR

from app.db.base_class import Base


class RefreshToken(Base):
    id = Column(VARCHAR(255), primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    validity_timestamp = Column(BigInteger, index=True)
