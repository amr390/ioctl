from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared Properties
class TeamBase(BaseModel):
    name: Optional[EmailStr] = None
    description: Optional[str] = None

    organization_id: Optional[int] = None


# Properties to receive via API on creation
class TeamCreate(TeamBase):
    name: str
    organization_id: int


# Properties to receive via API on update
class TeamUpdate(TeamBase):
    pass


class TeamInDBBase(TeamBase):
    id: int
    name: str
    organization_id: int

    class Config:
        orm_mode = True


# Additional properties return via API
class Team(TeamInDBBase):
    pass


# Additional properties stored in DB
class TeamInDB(TeamInDBBase):
    pass
