from typing import Any
from sqlalchemy.orm import Session
from src.controller.base_controller import BaseController
import src.models as models
import src.schemas as schemas
from src.utils import Singleton

"""
This class is a CRUD class for the user table.
"""

class ShareCRUD(
    
    BaseController[schemas.UserShareList, schemas.UserShareListCreate, schemas.UserShareListUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.Share)


    def get_by_share_user(self, db: Session , share_user_id: Any):
        return db.query(self.model_cls).filter(self.model_cls.idShareUser == share_user_id).all()

    def get_by_creation_user(self, db: Session , creation_user_id: Any):
        return db.query(self.model_cls).filter(self.model_cls.idCreationUser == creation_user_id).all()

# Create a singleton instance of the ShareCRUD class
share = ShareCRUD()