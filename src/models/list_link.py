from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from src.adapters.orm_base import OrmBaseModel
from sqlalchemy import event
from sqlalchemy import DDL

"""
ORM class to interact with the user shares table in the database
"""


class ListLink(OrmBaseModel):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=True, unique=True)
    description = Column(String(1000), nullable=True)
    idCategory = Column(Integer, ForeignKey('category.id'), nullable=True)
    idCreationUser = Column(Integer, ForeignKey('user.id'), nullable=False)
    creationDate = Column(DateTime(timezone=True), default=datetime.utcnow)
    ModificationDate = Column(DateTime(timezone=True), default=datetime.utcnow)


restart_seq = DDL("ALTER SEQUENCE %(table)s_id_seq RESTART WITH 100;")

event.listen(
    ListLink.__table__, "after_create", restart_seq.execute_if(dialect="mysql")
)