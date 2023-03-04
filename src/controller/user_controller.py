from typing import List, Any
from sqlalchemy.orm import Session
import jwt

from src.controller.base_controller import BaseController
import src.models as models
import src.schemas as schemas
from src.utils import Singleton
import src.utils.criptography as crypto
from src.utils.settings import ( SECRET_KEY) 

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
    
    def get_by_name(self, db: Session ,user_name: Any):
        return db.query(self.model_cls).filter(self.model_cls.userName == user_name).first()
    
    def auth_user(self, db: Session, auth: Any):
        user = UserCRUD.get_by_name(self, db, auth.userName)
        if user:
            decryptpassword = crypto.decrypt_password(user.password)
            if decryptpassword == auth.password:
                payload_data = {
                    "sub": user.id,
                    "rol": user.rol,
                    "username": user.userName
                }

                token = jwt.encode(
                    payload = payload_data,
                    key = SECRET_KEY
                )

                response = {
                    "type": "sucess",
                    "message": "Bienvenido {}".format(user.userName),
                    "data":{
                        "token": token
                    }
                }
            else:
                response = {
                    "type": "error",
                    "message": "Invalid credentials",
                    "data": []
                }
        else:
            response = {
                "type": "error",
                "message": "Invalid credentials",
                "data": []
            }

        return response




# Create a singleton instance of the ImageRecordCRUD class
user = UserCRUD()