import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const deleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

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

        <button onClick={() => navigate("/add-reminder")}>
          Add Reminder
        </button>

        <button onClick={() => navigate("/reminders")}>
          View Reminders
        </button>

        <button onClick={() => navigate("/profile")}>
          Edit User
        </button>

        <button
          onClick={deleteUser}
          style={{ background: "red", color: "white" }}
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
