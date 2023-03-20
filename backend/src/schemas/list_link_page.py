from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ListLinkPageSchema(BaseModel):
    idList: int
    idPage: int
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]

class ListLinkPageCreate(ListLinkPageSchema):
    pass


class ListLinkPageUpdate(ListLinkPageSchema):
    pass


class ListLinkPage(ListLinkPageSchema):
    list_link__page_id: int = None

    class Config:
        orm_mode = True