from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared Properties
class ClanBase(BaseModel):
    name: Optional[EmailStr] = None
    description: Optional[str] = None

    owner_id: Optional[int] = None


# Properties to receive via API on creation
class ClanCreate(ClanBase):
    name: str
    owner_id: int


# Properties to receive via API on update
class ClanUpdate(ClanBase):
    pass


class ClanInDBBase(ClanBase):
    id: int
    name: str
    owner_id: int

    class Config:
        orm_mode = True


# Additional properties return via API
class Clan(ClanInDBBase):
    pass


# Additional properties stored in DB
class ClanInDB(ClanInDBBase):
    pass
