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

# Create a singleton instance of the ListLinkCRUD class
list = ListLinkCRUD()