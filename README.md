# 🎓 Student Management System (SMS)

A modern, full-stack Student Management System built using **FastAPI**, **React.js (Vite)**, and **MySQL**. This application provides a clean, interactive UI for managing student records with real-time database synchronization and full CRUD (Create, Read, Update, Delete) capabilities.

---

## 🚀 Features

- **Interactive Dashboard & Directory**: Real-time listing of all enrolled students.
- **Student Registration**: Clean form validation with dynamic email uniqueness checks.
- **Record Updates**: Instant edit functionality using optimized PUT requests.
- **Student Deletion**: One-click record deletion with database propagation.
- **Asynchronous API Integration**: Robust error handling powered by Axios.
- **Cross-Origin Handling (CORS)**: Pre-configured middleware for seamless frontend-backend communication.

---

## 🛠️ Tech Stack

### **Backend**
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database Driver**: `pymysql`
- **Database**: MySQL 8.0+
- **Configuration**: `python-dotenv`

### **Frontend**
- **Framework**: [React.js](https://react.dev/) (via [Vite](https://vitejs.dev/))
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: Modern Responsive UI (Tailwind CSS / Custom CSS)

---

## 📂 Project Structure

```text
student_management_system/
├── app/                        # FastAPI Backend Application
│   ├── database.py             # SQLAlchemy Engine & Session Setup
│   ├── models.py               # Database ORM Models
│   ├── schema.py               # Pydantic Schemas for Request Validation
│   └── main.py                 # FastAPI Routes & CORS Middleware
│
├── frontend/                   # React Frontend Application
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js          # Axios API Service Module
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Overview Component
│   │   │   ├── AllStudents.jsx # Student List & CRUD Actions
│   │   │   └── CreateStudent.jsx # Registration Form
│   │   ├── App.jsx             # Main Application Routing
│   │   └── main.jsx            # DOM Entry Point
│   ├── package.json
│   └── vite.config.js
│
├── .env.example                # Sample Environment Variables
├── .gitignore                  # Git Ignored Files (.env, node_modules, etc.)
└── README.md                   # Project Documentation
