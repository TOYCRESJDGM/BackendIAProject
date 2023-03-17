from fastapi import Depends, HTTPException
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from sqlalchemy.orm import Session

from src.adapters.mysql_adapter import get_db
import src.controller as controller
import src.schemas as schemas
import src.utils.criptography as crypto

router = InferringRouter()


def mapper_response(category):
    print(category)
    response = {
        "id": category.id,
        "title": category.title,
        "description": category.description,
        "creationDate": category.creationDate 
    }
    return response

@cbv(router)
class CategoryRouter:
    # dependency injection
    db: Session = Depends(get_db)

    @router.get("/")
    def get_categories(self):
        """
        Get all categories
        :return:
        """
        response = {}
        
        category_map = []
        categories = controller.category.fetch_all(self.db)
        
        for category in categories:
            category_map.append(mapper_response(category))

        response = {
                "type": "success",
                "message": "data found",
                "data": category_map
        }

        return response

    @router.get("/{id}")
    def get_category(self, id:int):
        """
        Get a single category
        :return:
        """
        category =  controller.category.get(self.db, id)
        response = {
            "type": "sucess",
            "message": "data found",
            "data": mapper_response(category)
        } 
        
        return response
    
    @router.post("/create")
    def create_category(self, category:schemas.CategoryCreate):
        """
        create a category
        :return:
        """
        try:
            controller.category.create(self.db, entity=category)
            return {
                "type": "sucess",
                "message": "category create successfull"
            }
        except Exception as e:
            print(str(e))
            raise HTTPException(status_code=400, detail=str(e))