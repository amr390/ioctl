from typing import List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.hunter import Hunter
from app.schemas.hunter import HunterCreate, HunterUpdate


class CRUDHunter(CRUDBase[Hunter, HunterCreate, HunterUpdate]):
    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[Hunter]:
        return (
            db.query(self.model)
            .filter(Hunter.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all
        )

    def create(self, db: Session, *, obj_in: HunterCreate, user_id: int) -> Hunter:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create_with_owner(
        self, db: Session, *, obj_in: HunterCreate, owner_id: int
    ) -> Hunter:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, db_obj: Hunter, obj_in: HunterUpdate) -> Hunter:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        __import__("pdb").set_trace()
        return super().update(db, db_obj=db_obj, obj_in=update_data)


hunter = CRUDHunter(Hunter)
