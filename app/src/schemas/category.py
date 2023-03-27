from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class CategorySchema(BaseModel):
    title: str
    description: Optional[str]
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]

class CategoryCreate(CategorySchema):
    pass


class CategoryUpdate(CategorySchema):
    pass


class Category(CategorySchema):
    category_id: int = None

    class Config:
        orm_mode = True