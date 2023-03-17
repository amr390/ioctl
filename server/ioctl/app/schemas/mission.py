from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared Properties
class MissionBase(BaseModel):
    name: Optional[EmailStr] = None
    description: Optional[bool] = False


# Properties to receive via API on creation
class MissionCreate(MissionBase):
    name: str
    squad_id: int


# Properties to receive via API on update
class MissionUpdate(MissionBase):
    pass


class MissionInDBBase(MissionBase):
    id: int
    name: str
    squad_id: int

    class Config:
        orm_mode = True


# Additional properties return via API
class Mission(MissionInDBBase):
    pass


# Additional properties stored in DB
class MissionInDB(MissionInDBBase):
    pass
