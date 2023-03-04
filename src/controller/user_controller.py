from typing import List

from sqlalchemy.orm import Session

from src.controller.base_controller import BaseController
import src.models as models
import src.schemas as schemas
from src.utils import Singleton

"""
This class is a CRUD class for the predictions table.
"""

print(schemas.user)
class UserCRUD(
    
    BaseController[schemas.User, schemas.UserCreate, schemas.UserUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.User)


# Create a singleton instance of the ImageRecordCRUD class
user = UserCRUD()