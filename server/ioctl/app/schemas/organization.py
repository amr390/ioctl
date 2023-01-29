from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared Properties
class OrganizationBase(BaseModel):
    name: Optional[EmailStr] = None
    description: Optional[str] = None

    owner_uid: Optional[int] = None


# Properties to receive via API on creation
class OrganizationCreate(OrganizationBase):
    name: str
    owner_uid: int


# Properties to receive via API on update
class OrganizationUpdate(OrganizationBase):
    pass


class OrganizationInDBBase(OrganizationBase):
    id: int
    name: str
    owner_uid: int

    class Config:
        orm_mode = True


# Additional properties return via API
class Organization(OrganizationInDBBase):
    pass


# Additional properties stored in DB
class OrganizationInDB(OrganizationInDBBase):
    pass
