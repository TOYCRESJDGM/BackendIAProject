from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from src.adapters.orm_base import OrmBaseModel
from sqlalchemy import event
from sqlalchemy import DDL

"""
ORM class to interact with the page relation table in the database
"""


class PageRelation(OrmBaseModel):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    pageId = Column(Integer, ForeignKey('page.id'), nullable=False)
    shareId = Column(Integer, ForeignKey('share.id'), nullable=False)
    creationDate = Column(DateTime(timezone=True), default=datetime.utcnow)
    ModificationDate = Column(DateTime(timezone=True), default=datetime.utcnow)


restart_seq = DDL("ALTER SEQUENCE %(table)s_label_id_seq RESTART WITH 100;")

event.listen(
    PageRelation.__table__, "after_create", restart_seq.execute_if(dialect="mysql")
)