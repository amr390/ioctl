from typing import Optional

from pydantic import BaseModel


# shared Properties
class HunterBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


# Properties to receive on hunter creation
class HunterCreate(HunterBase):
    title: str


# Properties to reeive on hunter update
class HunterUpdate(HunterBase):
    pass


# Properties shared by models stored in DB
class HunterInDBBase(HunterBase):
    id: int
    title: str
    owner_uid: int

    class Config:
        orm_mode = True


# Properties to return to Client
class Hunter(HunterInDBBase):
    pass


# Properties stored in DB
class HunterInDB(HunterInDBBase):
    pass
