from .crud_user import user
from .crud_role import role
from .crud_hunter import hunter
from .crud_token import token
from .crud_clan import clan
from .crud_mission import mission 
from .crud_squad import squad

# For a new basic set of CRUD operations you could just do

# from .base import CRUDBase
# from app.models.item import Item
# from app.schemas.item import ItemCreate, ItemUpdate

# item = CRUDBase[Item, ItemCreate, ItemUpdate](Item)
