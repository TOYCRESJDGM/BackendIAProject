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
    
    
# Create a singleton instance of the PageCRUD class
page = PageCRUD()