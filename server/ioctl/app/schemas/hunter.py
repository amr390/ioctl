from typing import Optional

from pydantic import BaseModel


# shared Properties
class HunterBase(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: str
    phone: str
    user_id: int


# Properties to receive on hunter creation
class HunterCreate(HunterBase):
    first_name: str
    email: str


# Properties to reeive on hunter update
class HunterUpdate(HunterBase):
    pass


# Properties shared by models stored in DB
class HunterInDBBase(HunterBase):
    id: int
    first_name: str
    email: str

    class Config:
        orm_mode = True


# Properties to return to Client
class Hunter(HunterInDBBase):
    pass


# Properties stored in DB
class HunterInDB(HunterInDBBase):
    pass
