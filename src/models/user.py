from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from src.adapters.orm_base import OrmBaseModel
from sqlalchemy import event
from sqlalchemy import DDL

"""
ORM class to interact with the user table in the database
"""


class User(OrmBaseModel):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userName = Column(String(100), nullable=False, unique=True)
    email = Column(String(1000), nullable=False)
    password = Column(String(1000), nullable=False)
    creationDate = Column(DateTime(timezone=True), default=datetime.utcnow)
    ModificationDate = Column(DateTime(timezone=True), default=datetime.utcnow)


restart_seq = DDL("ALTER SEQUENCE %(table)s_id_seq RESTART WITH 100;")

event.listen(
    User.__table__, "after_create", restart_seq.execute_if(dialect="mysql")
)