import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="sidebar">
      <div
        className="menu-item"
        onClick={() => {
          navigate("/home");
        }}
      >
        <button
          style={
            pathname === "/home"
              ? { backgroundColor: "#29B6F6", color: "white" }
              : {}
          }
        >
          <i className="bx bx-home"></i> Dashboard
        </button>
      </div>
      <div
        className="menu-item"
        onClick={() => {
          navigate("/home/prescriptions");
        }}
      >
        <button
          style={
            pathname.includes("prescriptions")
              ? { backgroundColor: "#29B6F6", color: "white" }
              : {}
          }
        >
          <i className="bx bx-file"></i> Prescription
        </button>
      </div>

      <div
        className="menu-item"
        onClick={() => {
          navigate("/home/chat");
        }}
      >
        <button
          style={
            pathname.includes("chat")
              ? { backgroundColor: "#29B6F6", color: "white" }
              : {}
          }
        >
          <i className="bx bx-chat"></i> Chat Assist
        </button>
      </div>

      <div
        className="menu-item"
        onClick={() => {
          navigate("/home/claims");
        }}
      >
        <button
          style={
            pathname.includes("claims")
              ? { backgroundColor: "#29B6F6", color: "white" }
              : {}
          }
        >
          <i className="bx bx-file"></i> Claims
        </button>
      </div>
      <div
        className="menu-item"
        onClick={() => {
          navigate("/home/plan");
        }}
      >
        <button
          style={
            pathname.includes("plan")
              ? { backgroundColor: "#29B6F6", color: "white" }
              : {}
          }
        >
          <i className="bx bx-file"></i> Plan
        </button>
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("UserID");
          navigate("/");
        }}
        className="logout-item"
      >
        <button id="logout-button">
          <i className="bx bx-log-out"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
