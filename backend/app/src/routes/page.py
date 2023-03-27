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

def mapper_pages(page):
    return {
        "id": page.id,
        "title": page.title,
        "description": page.description,
        "link": page.link,
        "img": "base64",
        "linkImage": page.linkImage,
        "creationDate": page.creationDate
    }

@cbv(router)
class PageRouter:
    # dependency injection
    db: Session = Depends(get_db)

    @router.get("/")
    def get_all_page_user(self, start_date: datetime = None,end_date: datetime = None, user_id: int = None):
        """
        Get all page user
        :return:
        """
        if (start_date and not end_date) or (not start_date and end_date):
            if not start_date:
                start_date =  datetime.now()
            if not end_date:
                end_date =  datetime.now()
    
        pages = []
        if user_id:
            list_links =  controller.list.get_by_creation_user_id(self.db, user_id, start_date, end_date)
            for link_page in list_links:
                link_list_page = controller.link.get_by_list_id(self.db, link_page.id)
                for link in link_list_page:
                    page = controller.page.get(self.db, link.idPage)
                    pages.append(page)
            
        if len(pages)>0:
            response = {
                "type": "sucess",
                "message": "data found",
                "data": list(map(mapper_pages, pages))
            }
        else:
            response = {
                "type": "error",
                "message": "data not found"
                }
            
        return response  

    @router.get("/{id}")
    def get_page_id(self, id:int):
        """
        Get a single user
        :return:
        """
        page =  controller.page.get(self.db, id)
        if page:
            response = {
                "type": "sucess",
                "message": "data found",
                "data": mapper_pages(page)
            }
        else:
            response = {
                "type": "error",
                "message": "data not found",
                "data": []
            }
        
        return response

    @router.get("/list/{list_id}")
    def get_page_with_list_id(self, list_id:int):
        """
        Get a pages with list id
        :return:
        """
        pages = []
        if list_id:
            list_link =  controller.list.get(self.db, list_id)
            if list_link:
                link_list_page = controller.link.get_by_list_id(self.db, list_link.id)
                for link in link_list_page:
                    page = controller.page.get(self.db, link.idPage)
                    pages.append(page)
            
        if len(pages)>0:
            response = {
                "type": "sucess",
                "message": "data found",
                "data": list(map(mapper_pages, pages))
            }
        else:
            response = {
                "type": "error",
                "message": "data not found"
                }
            
        return response  