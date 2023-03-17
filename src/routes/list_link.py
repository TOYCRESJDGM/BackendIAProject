import json
from fastapi import Depends, HTTPException
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from sqlalchemy.orm import Session

from src.adapters.mysql_adapter import get_db
import src.controller as controller
import src.schemas as schemas

router = InferringRouter()


def creation_list_mapper(list):
    return {
        "name": list.name,
        "description": list.description,
        "idCreationUser": list.idCreationUser,
        "idCategory": list.idCategory,
        "ModificationDate": None,
        "creationDate": None
    }

@cbv(router)
class ListLinkRouter:
    # dependency injection
    db: Session = Depends(get_db)

    @router.get("/")
    def get_lists(self):
        """
        Get all list links
        :return:
        """
        response = {}
        
        list_maps = []
        categories = controller.list.fetch_all(self.db)
        
        for category in categories:
            list_maps.append(mapper_response(category))

        response = {
                "type": "success",
                "message": "data found",
                "data": list_maps
        }

        return response

    @router.get("/{id}")
    def get_category(self, id:int):
        """
        Get a single category
        :return:
        """
        list =  controller.list.get(self.db, id)
        response = {
            "type": "sucess",
            "message": "data found",
            "data": mapper_response(list)
        } 
        
        return response
    
    @router.post("/create")
    def create_list_link(self, list:schemas.ListLinkCreate):
        """
        create a list
        :return:
        """
        try:
            creation_list =creation_list_mapper(list)
            print(creation_list)

            controller.list.create(self.db, entity=creation_list)
            if list.links:
                for link in list.links:
                    #model to process link
                    print("Procesing link ...")
                    page = {
                        "link": link
                    }
                    print("creando la pagina")
                    page_created = controller.page.create(self.db, entity=page)

            if page_created:
                print("relacioando lista")


            return {
                "type": "sucess",
                "message": "List create successfull"
            }
            
        except Exception as e:
            print(str(e))
            raise HTTPException(status_code=400, detail=str(e))