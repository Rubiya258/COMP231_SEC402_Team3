import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import logo from "../assets/logo.svg"; 
import loginImage from "../assets/login.jpg";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
       <img src={logo} alt="App Logo" className="app-logo" />
       <img src={loginImage} alt="Illustration" className="page-illustration" />
      <h1>Welcome to ReminderApp</h1>
      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
}
