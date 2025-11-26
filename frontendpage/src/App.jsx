import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AddReminderPage from "./pages/AddReminderPage.jsx";
import ReminderListPage from "./pages/ReminderListPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import EditReminderPage from "./pages/EditReminderPage.jsx";
import Navbar from "./components/Navbar.jsx";
import "./styles/global.css";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
