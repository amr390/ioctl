import uuid
from typing import Any, Dict, Optional, Union
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.organization import Organization
from app.schemas.organization import OrganizationCreate, OrganizationUpdate


class CRUDOrganization(CRUDBase[Organization, OrganizationCreate, OrganizationUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Organization]:
        return db.query(Organization).filter(Organization.name == name).first()

    def get(self, db: Session, *, id: int) -> Optional[Organization]:
        return db.query(Organization).filter(Organization.id == id).one()

    def create(self, db: Session, *, obj_in: OrganizationCreate) -> Organization:
        db_obj = Organization(
            name=obj_in.name,
            description=obj_in.description,
            owner=obj_in.owner_uid,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create_default(self, db: Session, *, owner_uid: int) -> Organization:
        org: OrganizationCreate = OrganizationCreate(
            name="default",
            description="Solo Hunter default organization",
            owner_uid=owner_uid,
        )
        organization = self.create(db=db, obj_in=org)
        return organization

    def update(
        self,
        db: Session,
        *,
        db_obj: Organization,
        obj_in: Union[OrganizationUpdate, Dict[str, Any]]
    ) -> Organization:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)


organization = CRUDOrganization(Organization)
