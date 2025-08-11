import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Event = lazy(() => import("@/pages/Event"));
const ProtectedRoute = lazy(() => import("@/components/ProtectedRoute"));

function Fallback() {
  return (
    <div className="fallback-container">
      <div className="spinner" />
      <h2>Loading…</h2>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
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
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <Event />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="container">
              <h2>Not Found</h2>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}
