from datetime import datetime
from fastapi import Depends, HTTPException
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from sqlalchemy.orm import Session

from src.adapters.mysql_adapter import get_db
import src.controller as controller
import src.schemas as schemas
import src.utils.criptography as crypto

router = InferringRouter()

@cbv(router)
class PageRouter:
    # dependency injection
    db: Session = Depends(get_db)

    @router.get("/")
    def get_users_page(self, start_date: datetime,end_date: datetime):
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
    