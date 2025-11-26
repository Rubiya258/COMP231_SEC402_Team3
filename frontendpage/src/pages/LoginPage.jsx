import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api.js";
import "../styles/form.css";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const login = async () => {
    try {
      const res = await fetch(API.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);

       
        navigate("/dashboard");
      } else {
        
        setMessage(data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
