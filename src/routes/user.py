from fastapi import Depends
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from sqlalchemy.orm import Session

from src.adapters.mysql_adapter import get_db
import src.controller as controller

router = InferringRouter()


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
        return "ImageRecordRouter ready"

    @router.get("/")
    def get_users(self):
        """
        Get all images
        :return:
        """
        #return controller.user.fetch_all(self.db)
        return controller.user.fetch_all(self.db)
        #return crud.image_record.fetch_all(self.db)