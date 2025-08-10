import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsCheckingAuth(false), 50);
    return () => clearTimeout(timer);
  }, []);

  if (isCheckingAuth) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;