import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AddReminderPage from "./pages/AddReminderPage.jsx";
import ReminderListPage from "./pages/ReminderListPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import EditReminderPage from "./pages/EditReminderPage.jsx";

import Navbar from "./components/Navbar.jsx";
import NotificationPopup from "./components/NotificationPopup.jsx";

import "./styles/global.css";

export default function App() {
  const userId = localStorage.getItem("userId"); // Logged-in user
  const [popupData, setPopupData] = useState(null); // Global popup

  // GLOBAL REMINDER CHECKER: runs on all pages
  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(() => {
      fetch(`http://localhost:8088/api/reminders/overdue/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setPopupData(data[0]); // show first reminder
          }
        })
        .catch((err) => console.log("Reminder check error:", err));
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <BrowserRouter>
      <Navbar />

      {/* GLOBAL POPUP - Appears on ALL PAGES */}
            {popupData && (
        <NotificationPopup
          title={popupData.title}
          description={popupData.description}
          time={popupData.notificationTime}
          onClose={() => setPopupData(null)}
        />
      )}


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-reminder" element={<AddReminderPage />} />
        <Route path="/reminders" element={<ReminderListPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/edit-reminder/:id" element={<EditReminderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
