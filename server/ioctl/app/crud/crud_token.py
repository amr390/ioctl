from typing import Any, Dict, Optional, Union
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.token import RefreshToken
from app.schemas.token import TokenCreate, TokenUpdate


class CRUDToken(CRUDBase[RefreshToken, TokenCreate, TokenUpdate]):
    def get_by_user_id(self, db: Session, *, user_id: int) -> Optional[RefreshToken]:
        return db.query(RefreshToken).filter(RefreshToken.user_id == user_id).first()

    def get(self, db: Session, *, id: int) -> Optional[RefreshToken]:
        return db.query(RefreshToken).filter(RefreshToken.id == id).one()

    def create(self, db: Session, *, obj_in: TokenCreate) -> RefreshToken:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: RefreshToken,
        obj_in: Union[TokenUpdate, Dict[str, Any]],
    ) -> RefreshToken:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def delete(
        self,
        db: Session,
        *,
        token_id: int,
    ) -> None:
        db.delete(RefreshToken.id == token_id)


token = CRUDToken(RefreshToken)
