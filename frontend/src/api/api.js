import axios from "axios";

const API_URL = "http://3.6.168.234:8000/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create Student
export const createStudent = async (studentData) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to create student";
  }
};

// Get All Students
export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to fetch students";
  }
};

// Delete Student 
export const deleteStudent = async (studentID) => {
  try {
    const response = await api.delete(`/students/${studentID}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to delete student";
  }
};

// Update Student (✅ Fixed: `api.put` use kiya aur `studentData` payload pass kiya)
export const updateStudent = async (studentID, studentData) => {
  try {
    const response = await api.put(`/students/${studentID}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to update student";
  }
};

export default api;