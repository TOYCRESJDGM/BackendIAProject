from src.adapters.mysql_adapter import create_db, drop_db
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.routes import user
import uvicorn
from src.utils.settings import (
    APP_PORT
)

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello World from docker"}


# add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


# @app.on_event("shutdown")
# def shutdown_event():
#     """
#     Drop the database
#     :return:
#     """
#     drop_db()


@app.on_event("startup")
def startup_event():
    """
    Create the database
    :return:
    """
    create_db()


app.include_router(
    user.router,
    prefix="/user",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)

