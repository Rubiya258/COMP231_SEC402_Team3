import React, { useState } from "react";
import { loginApi, saveLoggedUser } from "../service/AuthApiService";
import { useNavigate } from "react-router-dom";
import "../css/tasks.css";
import loginImage from "../assets/login.jpg"; // Import the image

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  async function handleLoginForm(event) {
    event.preventDefault();
    setLoginMessage("");

    if (validateForm()) {
      try {
        const result = await loginApi(username, password);
        setLoginMessage(result);
        
        if (result === "Login successful!") {
          // Save user info in localStorage for frontend use
          saveLoggedUser({ username });
          navigate("/tasks"); // Redirect to tasks page
        }
      } catch (error) {
        console.error(error);
        setLoginMessage("Login failed. Please try again.");
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!username.trim()) {
      errorsCopy.username = "Username required";
      valid = false;
    } else {
      errorsCopy.username = "";
    }

    if (!password.trim()) {
      errorsCopy.password = "Password required";
      valid = false;
    } else {
      errorsCopy.password = "";
    }
    
    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img src={loginImage} alt="Login Page" className="login-image" />
        </div>
        <div className="login-form-section">
          <div className="login-form-container">
            <h2 className="login-title">Login</h2>
            {loginMessage && (
              <div className={`login-message ${loginMessage.includes("successful") ? "success" : "error"}`}>
                {loginMessage}
              </div>
            )}
            <form onSubmit={handleLoginForm}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className={`form-input ${errors.username ? "input-error" : ""}`}
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                {errors.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </form>
            <div className="login-links">
              {/*<p>Don't have an account? <a href="/register">Sign up</a></p>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;