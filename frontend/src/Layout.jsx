import { Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import "./styles/Prescriptions.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Chat } from "./components/Chat";
import Dashboard from "./components/Dashboard";
import ClaimPage from "./components/ClaimsPage";
import Visuals from "./components/Visuals";
import Insurance from "./components/Insurance";

export const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const funct = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user-details-status/` +
          localStorage.getItem("UserID")
      );
      if (!response.data.UserDetails) {
        navigate("/details/user-info");
      }
    };
    funct();
  }, [navigate]);

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="prescriptions" element={<MainContent />} />
          <Route path="claims" element={<ClaimPage />} />
          <Route path="plan" element={<Insurance />} />
          <Route path="plan/visuals" element={<Visuals />} />
        </Routes>
      </div>
    </div>
  );
};
