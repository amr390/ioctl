from typing import Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.mission import Mission
from app.models.squad import Squad
from app.models.user import User
from app.schemas.mission import MissionCreate, MissionUpdate


class CRUDMission(CRUDBase[Mission, MissionCreate, MissionUpdate]):
    def get(self, db: Session, *, id: int) -> Optional[Mission]:
        return db.query(Mission).filter(Mission.id == id).one()

    def get_by_user(self, db: Session, *, leader_id: int) -> Optional[Mission]:
        return db.query(Mission).filter(Mission.leader_id == leader_id).first()

    def get_by_name(self, db: Session, *, name: str) -> Optional[Mission]:
        return db.query(Mission).filter(Mission.name == name).first()

    def create(self, db: Session, *, obj_in: MissionCreate) -> Mission:
        db_obj = Mission(
            title=obj_in.title,
            description=obj_in.description,
            leader_id=obj_in.leader_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create_default(self, db: Session, *, squad: Squad, user: User) -> Mission:
        obj_in = MissionCreate(
            title="Default Mission",
            leader_id=user.id,
        )
        mission = self.create(db=db, obj_in=obj_in)
        self.add_squads(db=db, mission=mission, squad=squad)
        return mission


    def add_squads(self, db: Session, *, mission: Mission, squad: Squad) -> Mission:
        mission.squads.append(squad)
        db.add(mission)
        db.commit()
        db.refresh(mission)

        return mission
    


mission = CRUDMission(Mission)
