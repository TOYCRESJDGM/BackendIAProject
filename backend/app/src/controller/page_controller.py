from typing import List, Any
from sqlalchemy.orm import Session
from src.controller.base_controller import BaseController
import src.models as models
import src.schemas as schemas
from src.utils import Singleton

"""
This class is a CRUD class for the page table.
"""

class PageCRUD(
    
    BaseController[schemas.Page, schemas.PageCreate, schemas.PageUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.Page) 
    
    def filters_pages(self, db: Session ,start_date: Any, end_date:Any):
        return db.query(self.model_cls).filter(self.model_cls.creationDate >= start_date & self.model_cls.creationDate <= end_date).all()
    
    
# Create a singleton instance of the PageCRUD class
page = PageCRUD()