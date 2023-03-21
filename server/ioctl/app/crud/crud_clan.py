from typing import Any, Dict, Optional, Union
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.clan import Clan
from app.schemas.clan import ClanCreate, ClanUpdate


class CRUDClan(CRUDBase[Clan, ClanCreate, ClanUpdate]):
    def get(self, db: Session, *, id: int) -> Optional[Clan]:
        return db.query(Clan).filter(Clan.id == id).one()

    def get_by_user(self, db: Session, *, owner_id: int) -> Optional[Clan]:
        return db.query(Clan).filter(clan.owner_id == user_id).first()

    def get_by_name(self, db: Session, *, name: str) -> Optional[Clan]:
        return db.query(Clan).filter(Clan.name == name).first()

    def create(self, db: Session, *, obj_in: ClanCreate) -> Clan:
        db_obj = Clan(
            name=obj_in.name,
            description=obj_in.description,
            owner_id=obj_in.owner_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create_default(self, db: Session, *, owner_id: int) -> Clan:
        org: ClanCreate = ClanCreate(
            name="default",
            description="Solo Hunter default clan",
            owner_id=owner_id,
        )
        clan = self.create(db=db, obj_in=org)
        return clan

    def update(
        self,
        db: Session,
        *,
        db_obj: Clan,
        obj_in: Union[ClanUpdate, Dict[str, Any]]
    ) -> Clan:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)


clan = CRUDClan(Clan)
