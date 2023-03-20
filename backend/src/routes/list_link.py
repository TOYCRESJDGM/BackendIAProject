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

def mapper_pages(page):
    return {
        "id": page.id,
        "title": page.title,
        "description": page.description,
        "link": page.link,
        "linkImage": page.linkImage,
        "creationDate": page.creationDate
    }

def response_list(list_link, pages):
    return {
        "id": list_link.id,
        "name": list_link.name,
        "description": list_link.description,
        "idCategory": list_link.idCategory,
        "idCreationUser": list_link.idCreationUser,
        "pages": list(map(mapper_pages, pages)),
        "creationDate": list_link.creationDate
    }
    
@cbv(router)
class ListLinkRouter:
    # dependency injection
    db: Session = Depends(get_db)

    @router.get("/")
    def get_lists(self, user_id: int = None):
        """
        Get all list links
        :return:
        """
        pages = []
        response_data = []
        if user_id:
            list_links =  controller.list.get_by_creation_user_id(self.db, user_id)
        else:
            list_links =  controller.list.fetch_all(self.db)
        if list_links:
            for link_page in list_links:
                link_list_page = controller.link.get_by_list_id(self.db, link_page.id)
                for link in link_list_page:
                    page = controller.page.get(self.db, link.idPage)
                    pages.append(page)
                
                response_data.append(response_list(link_page, pages))
                pages.clear()
            
            response = {
                    "type": "sucess",
                    "message": "data found",
                    "data": response_data
            }
        else:
            response = {
                "type": "error",
                "message": "data not found"
            }
        return response

    @router.get("/{id}")
    def get_list_link_id(self, id:int):
        """
        Get a single list link
        :return:
        """
        pages = []
        list_link =  controller.list.get(self.db, id)
        if list_link:
            link_list_page = controller.link.get_by_list_id(self.db, list_link.id)
            for link in link_list_page:
                page = controller.page.get(self.db, link.idPage)
                pages.append(page)
            
            response = {
                "type": "sucess",
                "message": "data found",
                "data": response_list(list_link, pages)
            }
        else:
            response = {
                "type": "error",
                "message": "data not found"
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

            list_created = controller.list.create(self.db, entity=creation_list)
            if list.links:
                for link in list.links:
                    #model to process link
                    #creation pages and relation
                    print("Procesing link ...")
                    page = {
                        "link": link
                    }
                    print("creando la pagina")
                    page_created = controller.page.create(self.db, entity=page)

                    if page_created:
                        print("relacioando lista")
                        list_link = {
                            "idList": list_created.id,
                            "idPage": page_created.id
                        }
                        link_created = controller.link.create(self.db, entity=list_link)
          
            return {
                "type": "sucess",
                "message": "List create successfull"
            }
            
        except Exception as e:
            print(str(e))
            raise HTTPException(status_code=400, detail=str(e))