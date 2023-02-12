import uuid
from typing import Any, Dict, Optional, Union
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.squad import Squad
from app.models.user import User
from app.schemas.squad import SquadCreate, SquadUpdate


class CRUDSquad(CRUDBase[Squad, SquadCreate, SquadUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Squad]:
        return db.query(Squad).filter(Squad.name == name).first()

    def get(self, db: Session, *, id: int) -> Optional[Squad]:
        return db.query(Squad).filter(Squad.id == id).one()

    def create(self, db: Session, *, obj_in: SquadCreate) -> Squad:
        db_obj = Squad(
            name=obj_in.name,
            description=obj_in.description,
            clan=obj_in.clan_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create_default(self, db: Session, *, org_id: int, user: User) -> Squad:
        org: SquadCreate = SquadCreate(
            name="default",
            description="Solo Hunter default Squad.",
            clan_id=org_id,
        )
        team = self.create(db=db, obj_in=org)
        self.add_user(db=db, db_obj=team, user=user)

    def update(
        self, db: Session, *, db_obj: Squad, obj_in: Union[SquadUpdate, Dict[str, Any]]
    ) -> Squad:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def add_user(self, db: Session, *, db_obj: Squad, user: User) -> Squad:
        db_obj.users.append(user)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj


squad = CRUDSquad(Squad)
