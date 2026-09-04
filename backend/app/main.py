from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base, get_db
from app.models import Student
from app.schema import StudentCreate


Base.metadata.create_all(bind=engine)

app = FastAPI()

# SIRF EK HI CORS MIDDLEWARE RAKHEIN:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Sabhi origins (localhost:5173, etc.) ko allow karega
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, OPTIONS sab allow hain
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "Message": "Student management API is running ✅"
    }


@app.get("/health")
def database_test():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "Success",
            "message": "Database working ✅"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


@app.post("/students")
def create_student(
    student: StudentCreate,
    db: Session = Depends(get_db)
):
    existing_student = (
        db.query(Student)
        .filter(Student.email == student.email)
        .first()
    )

    if existing_student:
        raise HTTPException(
            status_code=400,
            detail="Email already Exists"
        )

    new_student = Student(
        name=student.name,
        email=student.email,
        age=student.age
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "Message": "Student created Done ✅",
        "student": {
            "id": new_student.id,
            "name": new_student.name,
            "email": new_student.email,
            "age": new_student.age,
        }
    }


@app.get("/students")
def get_students(
    db: Session = Depends(get_db)
    
):
    
    students = db.query(Student).all()

    return {
        "message": "Students fetched successfully",
        "students": [
            {
                "id": student.id,
                "name": student.name,
                "email": student.email,
                "age": student.age
            }
            for student in students
        ]
    }

    
@app.put("/students/{student_id}")
def update_student(
    student_id: int,
    student_data: StudentCreate,
    db: Session = Depends(get_db)
):
    db_student = db.query(Student).filter(Student.id == student_id).first()

    if not db_student:
        raise HTTPException(
            status_code=404, 
            detail=f"Student with id {student_id} not found"
        )

    db_student.name = student_data.name
    db_student.email = student_data.email
    db_student.age = student_data.age

    db.commit()
    db.refresh(db_student)

    return {
        "message": "Student updated successfully ✅",
        "student": {
            "id": db_student.id,
            "name": db_student.name,
            "email": db_student.email,
            "age": db_student.age
        }
    }

    
@app.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    db.delete(student)
    db.commit()

    return {
        "message": f"Student with ID {student_id} deleted successfully ✅",
        "deleted_id": student_id
    }