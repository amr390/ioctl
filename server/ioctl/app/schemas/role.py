from typing import Optional

from pydantic import BaseModel


# shared Properties
class RoleBase(BaseModel):
    name: Optional[str] = None


# Properties to receive on item creation
class RoleCreate(RoleBase):
    name: str


# Properties to reeive on item update
class RoleUpdate(RoleBase):
    pass


# Properties shared by models stored in DB
class RoleInDBBase(RoleBase):
    id: int
    name: str

    class Config:
        orm_mode = True


# Properties to return to Client
class Role(RoleInDBBase):
    pass


# Properties stored in DB
class RoleInDB(RoleInDBBase):
    pass
