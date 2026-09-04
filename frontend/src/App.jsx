import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateStudent from "./pages/CreateStudent";
import AllStudents from "./pages/AllStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Create Student */}
        <Route
          path="/create-student"
          element={<CreateStudent />}
        />

        {/* All Students */}
        <Route
          path="/students"
          element={<AllStudents />}
        />

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;