"""
Adapter for mysql
"""

import json
from sqlalchemy import create_engine, event
from sqlalchemy.orm import (
    sessionmaker,
)  # create a session factory to connect to the database
from src.utils.settings import (
    ENVIRONMENT, 
    DB_NAME,
    DB_HOST
)

from functools import wraps
from .orm_base import OrmBaseModel

SQLALCHEMY_DATABASE_URL = "mysql://root:admin@localhost:3306/project"
print(f"SQLALCHEMY_DATABASE_URL: {SQLALCHEMY_DATABASE_URL}")
engine = create_engine(SQLALCHEMY_DATABASE_URL)


def on_connect(dbapi_con, con_record):
    print(f"connection established to database {dbapi_con}")

event.listen(engine, "connect", on_connect)

# connect factory to the database
SessionMaker = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, expire_on_commit=False
)

def create_session(func):
    """
    Create a database session
    :param func:
    :return:
    """

    @wraps(func)
    def wrapper(*args, **kwargs):
        session = SessionMaker()
        try:
            result = func(*args, session=session, **kwargs)
            session.commit()
            return result
        except:
            session.rollback()
            raise
        finally:
            session.close()

    return wrapper


def create_db():
    """
    Create all tables in the database
    :return:
    """
    OrmBaseModel.metadata.create_all(bind=engine)


def drop_db():
    """
    Drop all tables in the database
    :return:
    """
    OrmBaseModel.metadata.drop_all(bind=engine)


class DBConnection:
    def __init__(self):
        self.db = SessionMaker()

    def __enter__(self):
        return self.db

    def __exit__(self, exc_type, exc_value, traceback):
        self.db.close()


async def get_db():
    with DBConnection() as db:
        yield db


# def get_db():
#     """
#     Get the database session.
#     :return:
#     """
#     try:
#         db = SessionMaker()
#         yield db
#     finally:
#         db.close()