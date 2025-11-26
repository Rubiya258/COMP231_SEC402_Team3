import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { REMINDER_API } from "../services/api.js";
import "../styles/form.css";


export default function EditReminderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    notificationTime: "",
    completed: false,
  });

  useEffect(() => {
    fetch(REMINDER_API.GET_ONE(id))
      .then((res) => res.json())
      .then((reminder) => {
        setForm({
          title: reminder.title,
          description: reminder.description,
          notificationTime: reminder.notificationTime
            ? reminder.notificationTime.substring(0, 16)
            : "",
          completed: reminder.completed,
        });
      });
  }, [id]);

  const update = async () => {
    const payload = {
      title: form.title,
      description: form.description,
      notificationTime: form.notificationTime || null,
      completed: form.completed,
    };

    const res = await fetch(REMINDER_API.UPDATE(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      navigate("/reminders");
    } else {
      alert("Failed to update reminder.");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Reminder</h2>

      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
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

      <button onClick={update}>Save</button>
      <button onClick={() => navigate("/reminders")} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </div>
  );
}
