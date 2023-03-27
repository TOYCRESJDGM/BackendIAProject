from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class UserSchema(BaseModel):
    userName: str
    email: str
    rol: str
    password: str
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]

class UserCreate(UserSchema):
    pass


class UserUpdate(UserSchema):
    pass

class UserAuth(BaseModel):
    email: str 
    password: str


class UserShareListSchema(BaseModel):
    idList: int
    idCreationUser: int
    emailShare: str
    idShareUser: Optional[int]
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]


class UserShareListCreate(UserShareListSchema):
    pass


class UserShareListUpdate(UserShareListSchema):
    pass

class UserShareList(UserShareListSchema):
    user_id: int = None

    class Config:
        orm_mode = True

class User(UserSchema):
    user_id: int = None

    class Config:
        orm_mode = True