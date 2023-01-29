from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared Properties
class ProjectBase(BaseModel):
    name: Optional[EmailStr] = None
    description: Optional[bool] = False

    owner_uid: Optional[int] = None


# Properties to receive via API on creation
class ProjectCreate(ProjectBase):
    name: str
    owner_uid: int


# Properties to receive via API on update
class ProjectUpdate(ProjectBase):
    pass


class ProjectInDBBase(ProjectBase):
    id: int
    name: str
    owner_uid: int

    class Config:
        orm_mode = True


# Additional properties return via API
class Project(ProjectInDBBase):
    pass


# Additional properties stored in DB
class ProjectInDB(ProjectInDBBase):
    pass
