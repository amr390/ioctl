from app.crud.base import CRUDBase
from app.models.mission import Mission
from app.schemas.mission import MissionCreate, MissionUpdate


class CRUDMission(CRUDBase[Mission, MissionCreate, MissionUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Mission]:
        return db.query(Mission).filter(Mission.name == name).first()

    def get(self, db: Session, *, id: int) -> Optional[Mission]:
        return db.query(Mission).filter(Mission.id == id).one()

    # def create(self, db: Session, *, obj_in: MissionCreate) -> Mission:
    #     db_obj = Mission(
    #         name=obj_in.name,
    #         description = obj_in.description,
    #         squad=obj_in.mission_id
    #     )
