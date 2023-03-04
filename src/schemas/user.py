from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class UserSchema(BaseModel):
    userName: str
    email: str
    password: str
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]

class UserCreate(UserSchema):
    pass


class UserUpdate(UserSchema):
    pass


class User(UserSchema):
    user_id: int = None

    class Config:
        orm_mode = True