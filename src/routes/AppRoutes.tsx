import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Event from "@/pages/Event";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/events/:id" element={<ProtectedRoute><Event /></ProtectedRoute>} />
      <Route
        path="*"
        element={
          <div className="container">
            <h2>Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
}
