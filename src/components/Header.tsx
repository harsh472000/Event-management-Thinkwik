import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CommonButton from "@/components/common/CommonButton";
import "@/styles/index.css";
import { useFilters } from "@/hooks/useFilter";
import "@/styles/header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const { resetFilters } = useFilters();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    resetFilters();
  };

  return (
    <header className="app-header">
      <nav className="container header-nav">
        <Link to="/" className="brand">
          Events
        </Link>

        <div className="nav-actions">
          {user && (
            <div className="user-greeting">
              Hi, {user.name || user.email.split("@")[0]}
            </div>
          )}

          {user ? (
            <CommonButton variant="danger" onClick={onLogout} className="">
              Logout
            </CommonButton>
          ) : (
            <div className="auth-buttons">
              <Link className="btn ghost" to="/login">
                Login
              </Link>
              <CommonButton
                variant="primary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </CommonButton>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
