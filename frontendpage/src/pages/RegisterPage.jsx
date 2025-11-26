import { useState } from "react";
import { API } from "../services/api.js";
import "../styles/form.css";
import logo from "../assets/logo.svg";
import loginImage from "../assets/login.jpg";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.username.trim()) return "Username is required";
    if (!form.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email";
    if (!form.password) return "Password is required";
    if (!form.phone_number.trim()) return "Phone number is required";
    return null;
  };

  const register = async () => {
    setError("");
    setMessage("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch(API.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage(data.message || "Registration successful. Redirecting to login...");
        window.location.href = "/";
      } else {
        setError(data.message || `Registration failed (status ${res.status})`);
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <div className="form-container">

       <img src={logo} alt="Logo" className="app-logo" />
      <img src={loginImage} alt="Register Illustration" className="page-illustration" />

      <h2>Register</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone_number"
        placeholder="Phone number"
        value={form.phone_number}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={register}>Register</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
