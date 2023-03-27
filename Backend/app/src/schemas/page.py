from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class PageSchema(BaseModel):
    link: str
    description: Optional[str]
    title: Optional[str]
    linkImage: Optional[str]
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]

class PageCreate(PageSchema):
    pass


class PageUpdate(PageSchema):
    pass


class Page(PageSchema):
    page_id: int = None

    class Config:
        orm_mode = True