import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<>This is Home page</>}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<div className="container"><h2>Not Found</h2></div>} />
    </Routes>
  );
}