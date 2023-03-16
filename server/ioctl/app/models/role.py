
from sqlalchemy import Column,  Integer, String

from app.db.base_class import Base


class Role(Base):
    __tablename__ = 'role'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
