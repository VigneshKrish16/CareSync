import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      <img
        src="https://i.giphy.com/l0He4fJxPCbfqv7Xi.webp"
        alt="Loading..."
        className="loading-gif"
      />{" "}
      {/* Replace with your GIF path */}
    </div>
  );
};

export default LoadingPage;
