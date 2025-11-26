import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REMINDER_API, NOTIFICATION_API } from "../services/api";
import "../styles/list.css";

export default function ReminderListPage() {
  const [reminders, setReminders] = useState([]);
  const [notifications, setNotifications] = useState({});
  const [activeReminderId, setActiveReminderId] = useState(null);
  const [newNotificationTime, setNewNotificationTime] = useState("");
  const [newNotificationPriority, setNewNotificationPriority] = useState("");
  const [newNotificationEnabled, setNewNotificationEnabled] = useState(true);

  const navigate = useNavigate();

  
  const loadReminders = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(REMINDER_API.BY_USER(userId))
      .then(res => res.json())
      .then(data => {
        setReminders(data);

        
        data.forEach(r => loadNotifications(r.reminderId));
      })
      .catch(err => console.error("Error loading reminders:", err));
  };


  const loadNotifications = (reminderId) => {
    fetch(NOTIFICATION_API.BY_REMINDER(reminderId))
      .then(res => res.json())
      .then(data => setNotifications(prev => ({ ...prev, [reminderId]: data })))
      .catch(err => console.error("Error loading notifications:", err));
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const removeReminder = async (id) => {
    await fetch(REMINDER_API.DELETE(id), { method: "DELETE" });
    setReminders(prev => prev.filter(r => r.reminderId !== Number(id)));
  };

 const addNotification = async () => {
  if (!newNotificationTime || !newNotificationPriority) {
    alert("Please fill all notification fields (time & priority).");
    return;
  }

  const reminderId = activeReminderId;
  if (!reminderId) {
    alert("No reminder selected.");
    return;
  }

  try {
    const res = await fetch(NOTIFICATION_API.CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notificationTime: newNotificationTime,
        priority: newNotificationPriority,
        enabled: newNotificationEnabled,
        reminder: { reminderId },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Failed to add notification: " + (err.message || res.statusText));
      return;
    }

    setNewNotificationTime("");
    setNewNotificationPriority("");
    setNewNotificationEnabled(true);
    setActiveReminderId(null);

    loadNotifications(reminderId);
  } catch (err) {
    console.error(err);
    alert("Network error while adding notification");
  }
};


  return (
    <div className="list-container">
      <h2 className="list-title">Your Reminders</h2>

      {reminders.length === 0 && <p className="no-reminder-text">No reminders found.</p>}

      <div className="reminder-grid">
        {reminders.map((r) => (
          <div key={r.reminderId} className="reminder-card">
            <h3 className="reminder-title">{r.title || "Untitled Reminder"}</h3>

            <p><strong>Description:</strong> {r.description || "No description"}</p>

            <p>
              <strong>Notify At:</strong>{" "}
              {r.notificationTime
                ? new Date(r.notificationTime).toLocaleString()
                : "N/A"}
            </p>

            <p><strong>Status:</strong> {r.completed ? "Completed" : "Active"}</p>

            <hr />

           
            <h4>Notifications:</h4>
            {notifications[r.reminderId] && notifications[r.reminderId].length > 0 ? (
              notifications[r.reminderId].map(n => (
                <p key={n.id}>
                  📅 {new Date(n.notificationTime).toLocaleString()} - 
                  {n.priority} - {n.enabled ? "Enabled" : "Disabled"}
                </p>
              ))
            ) : (
              <p>No notifications yet.</p>
            )}

          
            <div className="card-buttons">
              <button className="update-btn" onClick={() => setActiveReminderId(r.reminderId)}>
                Add Notification
              </button>

              <button
                className="update-btn"
                onClick={() => navigate(`/edit-reminder/${r.reminderId}`)}
              >
                Update
              </button>

              <button
                className="delete-btn"
                onClick={() => removeReminder(r.reminderId)}
              >
                Delete
              </button>
            </div>

           
            {activeReminderId === r.reminderId && (
              <div className="popup">
                <h4>Add Notification</h4>

                <label>
                  Time:
                  <input
                    type="datetime-local"
                    value={newNotificationTime}
                    onChange={e => setNewNotificationTime(e.target.value)}
                  />
                </label>

                <label>
                  Priority:
                  <select
                    value={newNotificationPriority}
                    onChange={e => setNewNotificationPriority(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </label>

                <label>
                  Enabled:
                  <input
                    type="checkbox"
                    checked={newNotificationEnabled}
                    onChange={e => setNewNotificationEnabled(e.target.checked)}
                  />
                </label>

                <button onClick={addNotification}>Save</button>
                <button onClick={() => setActiveReminderId(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
