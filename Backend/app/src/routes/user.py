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
    response = {
        "id": user.id,
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
    def get_users(self, user_email: str = ''):
        """
        Get all users
        :return:
        """
        response = {}
        if user_email:
            user = controller.user.get_by_email(self.db, user_email)
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
        if user:
            response = {
                "type": "sucess",
                "message": "data found",
                "data": mapper_response(user)
            }
        else:
            response = {
                "type": "error",
                "message": "data not found",
                "data": []
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
        user = controller.user.get_by_email(self.db, auth.email)
        if user:
            response = controller.user.auth_user(self.db, auth)
        else:
            response = {
                "type": "error",
                "message": "credentials error",
                "data": []
            }
            
        return response
    
    @router.delete("/{id}")
    def delete_user(self, id: int):
        """
        delete a user
        :return:
        """
        try:
            user = controller.user.get(self.db, id)
            if user:
                #busca las listas compartidas al usuario.
                print("searching for shared lists...") 
                shared_lists = controller.share.get_by_share_user(self.db, user.id)
                if shared_lists:
                    for shared_list in shared_lists:
                        controller.share.delete(self.db, shared_list.id)

                #busca las listas compartidas creadas por ese usuario. 
                print("searching for created shared lists...")
                shared_by_user =  controller.share.get_by_creation_user(self.db, user.id)
                if shared_by_user:
                    for shared_creation in shared_by_user:
                        controller.share.delete(self.db, shared_creation.id)
                #Busca las listas, listas relacionadas y paginas.
                print("searching pages and lists...")
                lists_creation = controller.list.get_by_creation_user_id(self.db, user.id)
                if lists_creation:
                    for list_creation in lists_creation:
                        link_list_page_creation = controller.link.get_by_list_id(self.db, list_creation.id)
                        if link_list_page_creation:
                            for link in link_list_page_creation:
                                controller.link.delete(self.db, link.id)
                                controller.page.delete(self.db, link.idPage)
                                
                        controller.list.delete(self.db,list_creation.id)
                            
                controller.user.delete(self.db, id)
                response = {
                    "type": "sucess",
                    "message": "user disabled successfull"
                }
            else:
                response = {
                    "type": "error",
                    "message": "user not found",
                    "data": []
                }
            
            return response

            
        except Exception as e:
            print(str(e))
            raise HTTPException(status_code=400, detail=str(e))
        
    

    @router.post("/share")
    def share_with_user(self, share: schemas.UserShareListSchema):
        """
        share list with user
        :return:
        """
        try:
            creation_user =  controller.user.get(self.db, share.idCreationUser)
            if creation_user:
                share_user = controller.user.get_by_email(self.db, share.emailShare)
                if share_user:
                    if creation_user.email == share_user.email:
                        response = {
                            "type": "error",
                            "message": "It's not possible to share the list with yourself"
                        }
               
                    create_share = {
                        "idList": share.idList,
                        "idCreationUser": creation_user.id,
                        "idShareUser" : share_user.id
                    }

                    controller.share.create(self.db, entity=create_share)

                    response = {
                        "type": "sucess",
                        "message": "successfully shared list"
                    }
                else:
                    response = {
                        "type": "error",
                        "message": "The email user does not exist"
                    }

            else:
                response = {
                    "type": "error",
                    "message": "Creation user does not exist"
                }


            return response 
    
        except Exception as e:
            print(str(e))
            raise HTTPException(status_code=400, detail=str(e))
    
        