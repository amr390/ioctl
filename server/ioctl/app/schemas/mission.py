from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared Properties
class MissionBase(BaseModel):
    title: Optional[EmailStr] = None
    description: Optional[bool] = False


# Properties to receive via API on creation
class MissionCreate(MissionBase):
    title: str
    leader_id: int


# Properties to receive via API on update
class MissionUpdate(MissionBase):
    pass


class MissionInDBBase(MissionBase):
    id: int
    title: str
    squad_id: int
    leader_id: int

    class Config:
        orm_mode = True


# Additional properties return via API
class Mission(MissionInDBBase):
    pass


# Additional properties stored in DB
class MissionInDB(MissionInDBBase):
    pass
