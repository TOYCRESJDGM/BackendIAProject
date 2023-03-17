from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from src.adapters.orm_base import OrmBaseModel
from sqlalchemy import event
from sqlalchemy import DDL

"""
ORM class to interact with the user shares table in the database
"""


class UserShare(OrmBaseModel):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    shareId = Column(Integer, ForeignKey('category.id'), nullable=False)
    UserIdShare = Column(Integer, ForeignKey('user.id'), nullable=False)
    creationDate = Column(DateTime(timezone=True), default=datetime.utcnow)
    ModificationDate = Column(DateTime(timezone=True), default=datetime.utcnow)


restart_seq = DDL("ALTER SEQUENCE %(table)s_label_id_seq RESTART WITH 100;")

event.listen(
    UserShare.__table__, "after_create", restart_seq.execute_if(dialect="mysql")
)