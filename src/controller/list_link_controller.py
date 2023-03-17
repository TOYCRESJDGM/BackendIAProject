from typing import List, Any
from sqlalchemy.orm import Session

from src.controller.base_controller import BaseController
from src.controller.page_controller import PageCRUD
import src.models as models
import src.schemas as schemas
from src.utils import Singleton

"""
This class is a CRUD class for the user table.
"""

def map_page_create(page):
    print(page)
    return {
        "link": page["link"] if page["link"] else "Test"
    }


class ListLinkCRUD(
    
    BaseController[schemas.ListLink, schemas.ListLinkCreate, schemas.ListLinkUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.ListLink)      

# Create a singleton instance of the UserCRUD class
list = ListLinkCRUD()