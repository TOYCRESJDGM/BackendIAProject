from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from src.adapters.orm_base import OrmBaseModel
from sqlalchemy import event
from sqlalchemy import DDL

"""
ORM class to interact with the page table in the database
"""

class Page(OrmBaseModel):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    link = Column(String(255), nullable=False, unique=True)   
    title = Column(String(100), nullable=True)
    description = Column(String(255), nullable=True)
    linkImage = Column(String(255), nullable=True)
    creationDate = Column(DateTime(timezone=True), default=datetime.utcnow)
    ModificationDate = Column(DateTime(timezone=True), default=datetime.utcnow)


restart_seq = DDL("ALTER SEQUENCE %(table)s_id_seq RESTART WITH 100;")

event.listen(
    Page.__table__, "after_create", restart_seq.execute_if(dialect="mysql")
)