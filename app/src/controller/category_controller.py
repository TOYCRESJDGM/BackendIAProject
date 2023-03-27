from src.controller.base_controller import BaseController
import src.models as models
import src.schemas as schemas
from src.utils import Singleton

"""
This class is a CRUD class for the user table.
"""

class CategoryCRUD(
    
    BaseController[schemas.Category, schemas.CategoryCreate, schemas.CategoryUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.Category)
    

# Create a singleton instance of the UserCRUD class
category = CategoryCRUD()