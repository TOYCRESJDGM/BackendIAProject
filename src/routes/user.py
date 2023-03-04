from fastapi import Depends
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from sqlalchemy.orm import Session

from src.adapters.mysql_adapter import get_db
import src.controller as controller

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

    @router.get("/home")
    def home(self):
        """
        status endpoint
        :return:
        """
        return "User ready"

    @router.get("/")
    def get_users(self):
        """
        Get all users
        :return:
        """
        user_list = []
        users = controller.user.fetch_all(self.db)
        
        for user in users:
            user_list.append(mapper_response(user))

        return {
            "type": "sucess",
            "data": user_list
        }

    @router.get("/{id}")
    def get_user(self, id:int):
        """
        Get a single user
        :return:
        """
        print("test")
        print(id)
        user =  controller.user.get(self.db, id)
        response = mapper_response(user)
        print(response)
        return response
    
    @router.post("/create")
    def create_user(self):
        """
        Get a single user
        :return:
        """
        print("test")
        print(id)
        user =  controller.user.get(self.db, id)
        response = mapper_response(user)
        print(response)
        return response
        