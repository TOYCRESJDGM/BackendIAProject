from fastapi import Depends, HTTPException
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from sqlalchemy.orm import Session

from src.adapters.mysql_adapter import get_db
import src.controller as controller
import src.schemas as schemas
import src.utils.criptography as crypto

router = InferringRouter()


def mapper_response(user):
    print(user)
    response = {
        "userName": user.userName,
        "rol": user.rol,
        "email": user.email,
        "creationDate": user.creationDate 
    }
    return response

@cbv(router)
class UserRouter:
    # dependency injection
    db: Session = Depends(get_db)

    @router.get("/")
    def get_users(self, user_name: str = ''):
        """
        Get all users
        :return:
        """
        response = {}
        if user_name:
            user = controller.user.get_by_name(self.db, user_name)
            if user:
                user_mapp = (mapper_response(user))
            else:
                response = {
                    "type": "error",
                    "message": "data not found",
                    "data": []
                }
        else:
            user_mapp = []
            users = controller.user.fetch_all(self.db)
        
            for user in users:
                user_mapp.append(mapper_response(user))

        response = {
                "type": "success",
                "message": "data found",
                "data": user_mapp
        }

        return response

    @router.get("/{id}")
    def get_user(self, id:int):
        """
        Get a single user
        :return:
        """
        user =  controller.user.get(self.db, id)
        response = {
            "type": "sucess",
            "message": "data found",
            "data": mapper_response(user)
        } 
        
        return response
    
    @router.post("/create")
    def create_user(self, user:schemas.UserCreate):
        """
        create a user
        :return:
        """
        try:
            user.password = crypto.encrypt_password(user.password)
            controller.user.create(self.db, entity=user)
            return {
                "type": "sucess",
                "message": "user create successfull"
            }
        except Exception as e:
            print(str(e))
            raise HTTPException(status_code=400, detail=str(e))
    
    @router.post("/auth")
    def auth_user(self, auth: schemas.UserAuth):
        """
        create a user
        :return:
        """
        return controller.user.auth_user(self.db, auth)
        