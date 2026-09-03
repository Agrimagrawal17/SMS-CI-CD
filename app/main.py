from fastapi import FastAPI
from sqlalchemy import text
from app.database import engine

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Student management API is running"
    }


@app.get("/health")
def database_test():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "success",
            "message": "Database working"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }