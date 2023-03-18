from typing import Any
from sqlalchemy.orm import Session
from src.controller.base_controller import BaseController
import src.models as models
import src.schemas as schemas
from src.utils import Singleton

"""
This class is a CRUD class for the user table.
"""

class ListLinkCRUD(
    
    BaseController[schemas.ListLink, schemas.ListLinkCreate, schemas.ListLinkUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.ListLink)

    def get_by_creation_user_id(self, db: Session ,user_id: Any):
        return db.query(self.model_cls).filter(self.model_cls.idCreationUser == user_id).all()   

    def get_by_category(self, db: Session ,category_id: Any):
        return db.query(self.model_cls).filter(self.model_cls.idCategory == category_id).all()    

# Create a singleton instance of the ListLinkCRUD class
list = ListLinkCRUD()