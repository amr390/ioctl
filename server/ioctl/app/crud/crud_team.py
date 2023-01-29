import uuid
from typing import Any, Dict, Optional, Union
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.team import Team
from app.models.user import User
from app.schemas.team import TeamCreate, TeamUpdate


class CRUDTeam(CRUDBase[Team, TeamCreate, TeamUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Team]:
        return db.query(Team).filter(Team.name == name).first()

    def get(self, db: Session, *, id: int) -> Optional[Team]:
        return db.query(Team).filter(Team.id == id).one()

    def create(self, db: Session, *, obj_in: TeamCreate) -> Team:
        db_obj = Team(
            name=obj_in.name,
            description=obj_in.description,
            organization=obj_in.organization_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create_default(self, db: Session, *, org_id: int, user: User) -> Team:
        org: TeamCreate = TeamCreate(
            name="default",
            description="Solo Hunter default Team.",
            organization_id=org_id,
        )
        team = self.create(db=db, obj_in=org)
        self.add_user(db=db, db_obj=team, user=user)

    def update(
        self, db: Session, *, db_obj: Team, obj_in: Union[TeamUpdate, Dict[str, Any]]
    ) -> Team:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def add_user(self, db: Session, *, db_obj: Team, user: User) -> Team:
        db_obj.users.append(user)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj


team = CRUDTeam(Team)
