import os
from dotenv import load_dotenv

load_dotenv(".env")
ENVIRONMENT = os.environ.get('ENVIRONMENT')
DB_NAME = os.environ.get('DB_NAME')
DB_HOST = os.environ.get('DB_HOST')
APP_PORT= os.environ.get('APP_PORT')
SECRET_KEY = os.environ.get('SECRET_KEY')






