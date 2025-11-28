import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import { useEffect, useState } from "react";
import NotificationPopup from "../components/NotificationPopup";

export default function DashboardPage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const [popupData, setPopupData] = useState(null);

  // Fetch overdue reminders every 5 seconds
  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(() => {
      fetch(`http://localhost:8088/api/reminders/overdue/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Overdue reminders:", data);

          if (Array.isArray(data) && data.length > 0) {
            setPopupData(data[0]); // Show first reminder
          }
        })
        .catch((err) => console.error("Error checking reminders:", err));
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  const deleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    const res = await fetch(`http://localhost:8088/api/users/delete/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Account deleted successfully.");
      localStorage.clear();
      navigate("/");
    } else {
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {username || "User"}!</h2>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/add-reminder")}>Add Reminder</button>

        <button onClick={() => navigate("/reminders")}>
          View Reminders
        </button>

        <button onClick={() => navigate("/profile")}>Edit User</button>

        <button
          onClick={deleteUser}
          style={{ background: "red", color: "white" }}
        >
          Delete User
        </button>
      </div>

      {/* POPUP */}
      {popupData && (
        <NotificationPopup
          title={popupData.title}
          description={popupData.description}
          onClose={() => setPopupData(null)}
        />
      )}
    </div>
  );
}
