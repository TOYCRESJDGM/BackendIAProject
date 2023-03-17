from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ListLinkSchema(BaseModel):
    name: str
    idCreationUser: int
    description: Optional[str]
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]

class ListLinkCreate(ListLinkSchema):
    pass


class ListLinkUpdate(ListLinkSchema):
    pass


class ListLink(ListLinkSchema):
    list_link_id: int = None

    class Config:
        orm_mode = True