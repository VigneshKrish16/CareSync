import group from "./assets/Group.png";
import careLogo from "./assets/CARE.png"; // Import the CARE logo
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./styles/home.css";

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem("UserID")) {
      navigate("/home");
    }
  });
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Adjust the path as needed
  };

  return (
    <div className="body">
      {/* Navbar */}
      <nav className="navbar flex justify-between items-center p-4">
        {/* Logo */}
        <div className="logo">
          <img src={careLogo} alt="CARE Logo" className="w-24" />{" "}
          {/* Adjust width as needed */}
        </div>

        {/* Navigation Links */}
        <div className="nav-links flex space-x-6">
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out"
          >
            HOME
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out"
          >
            FEATURES
          </a>
        </div>

        {/* Authentication Buttons */}
        <div className="auth-buttons">
          <button
            className="login-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero flex flex-col-reverse lg:flex-row items-center justify-between mt-12 p-6">
        {/* Left Side */}
        <div className="hero-left lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            Personalized <br /> Health Companion
          </h1>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Your personalized healthcare companion for managing and <br />
            improving your well-being effortlessly.
          </p>
          <button className="cta-btn bg-blue-500 text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            Explore 🔎
          </button>
        </div>

        {/* Right Side */}
        <div className="hero-right lg:w-1/2 text-center lg:text-right">
          <img
            src={group}
            alt="Healthcare Companion"
            className="w-full lg:w-3/4 mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
