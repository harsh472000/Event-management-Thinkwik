import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<>This is Home page</>}
      />
      <Route path="*" element={<div className="container"><h2>Not Found</h2></div>} />
    </Routes>
  );
}