from typing import Any
from sqlalchemy.orm import Session
from src.controller.base_controller import BaseController
import src.models as models
import src.schemas as schemas
from src.utils import Singleton

"""
This class is a CRUD class for the user table.
"""

class ListLinkPageCRUD(
    
    BaseController[schemas.ListLinkPage, schemas.ListLinkPageCreate, schemas.ListLinkPageUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.ListLinkPage) 


    def get_by_list_id(self, db: Session ,list_id: Any):
        return db.query(self.model_cls).filter(self.model_cls.idList == list_id).all()    

# Create a singleton instance of the ListLinkPageCRUD class
link = ListLinkPageCRUD()