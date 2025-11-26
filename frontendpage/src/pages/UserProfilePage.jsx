import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api.js";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_number: ""
  });

  useEffect(() => {
    fetch(`${API.USER}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          username: data.username,
          email: data.email,
          phone_number: data.phone_number
        });
      })
      .catch((err) => console.error("Error loading user", err));
  }, []);

  const updateUser = async () => {
    const res = await fetch(`${API.UPDATE_USER}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("User updated successfully!");
      localStorage.setItem("username", form.username);
      navigate("/dashboard");
    } else {
      alert("Failed to update user");
    }
  };

  const deleteUser = async () => {
    if (!window.confirm("Are you sure? This will delete your account permanently.")) return;

    const res = await fetch(`${API.DELETE_USER}/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Account deleted.");
      localStorage.clear();
      navigate("/");
    } else {
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit User</h2>

      <input
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="Username"
      />

      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
      />

      <input
        value={form.phone_number}
        onChange={(e) =>
          setForm({ ...form, phone_number: e.target.value })
        }
        placeholder="Phone Number"
      />

      <button onClick={updateUser}>Save</button>

      <button
        onClick={deleteUser}
        style={{ background: "red", color: "white" }}
      >
        Delete Account
      </button>
    </div>
  );
}
