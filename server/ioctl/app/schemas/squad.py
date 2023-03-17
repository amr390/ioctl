from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared Properties
class SquadBase(BaseModel):
    name: Optional[EmailStr] = None
    description: Optional[str] = None
    leader_id: Optional[int] = None

    clan_id: Optional[int] = None


# Properties to receive via API on creation
class SquadCreate(SquadBase):
    name: str
    description: Optional[str] = None
    leader_id: int
    clan_id: int


# Properties to receive via API on update
class SquadUpdate(SquadBase):
    pass


class SquadInDBBase(SquadBase):
    id: int
    name: str
    description: Optional[str] = None
    leader_id: int
    clan_id: int

    class Config:
        orm_mode = True


# Additional properties return via API
class Squad(SquadInDBBase):
    pass


# Additional properties stored in DB
class SquadInDB(SquadInDBBase):
    pass
