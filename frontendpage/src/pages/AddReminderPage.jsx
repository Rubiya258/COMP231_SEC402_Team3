import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REMINDER_API } from "../services/api.js";
import "../styles/form.css";

export default function AddReminderPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    notificationTime: "",
    completed: false,
  });

  const navigate = useNavigate();

  const save = async () => {
    const userId = Number(localStorage.getItem("userId"));
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    const payload = {
  user_id: Number(localStorage.getItem("userId")),
  title: form.title,
  description: form.description,
  notificationTime: form.notificationTime || null,
  completed: form.completed,
};

    const res = await fetch(REMINDER_API.ADD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      navigate("/reminders");
    } else {
      const error = await res.json();
      alert("Failed to add reminder: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Reminder</h2>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="datetime-local"
        value={form.notificationTime}
        onChange={(e) =>
          setForm({ ...form, notificationTime: e.target.value })
        }
      />

      <label>
        Completed:
        <input
          type="checkbox"
          checked={form.completed}
          onChange={(e) =>
            setForm({ ...form, completed: e.target.checked })
          }
        />
      </label>

      <button onClick={save}>Save</button>
    </div>
  );
}
