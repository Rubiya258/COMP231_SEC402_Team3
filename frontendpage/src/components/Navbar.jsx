import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">ReminderApp</span>
      </div>
      <div className="navbar-right">
        {!userId && (
          <>
            <Link className="nav-link" to="/">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
        {userId && (
          <>
            <span className="nav-user">Welcome, {username || "User"}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
