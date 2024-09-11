import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const enhancedCSS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --primary-color: #4287f5;
  --background-color: #f7f9fc;
  --text-color: #333;
  --border-color: #e0e0e0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--background-color);
}

.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.auth-form {
  background-color: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  max-width: 380px;
  width: 100%;
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.input-wrapper {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 135, 245, 0.1);
}

.input-icon {
  position: absolute;
  left: 0.8rem;
  color: #888;
}

.password-toggle {
  position: absolute;
  right: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
}

.submit-button {
  width: 100%;
  padding: 0.9rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2272d9;
}

.toggle-auth {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
}

.toggle-auth-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 600;
}

.toggle-auth-button:hover {
  text-decoration: underline;
}

.remember-me {
  display: flex;
  align-items: center;
  margin: 1rem 0 1.5rem;
}

.remember-me input {
  margin-right: 0.5rem;
}

.auth-form .input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.auth-form .input-icon {
  position: absolute;
  left: 0.75rem;
}

.auth-form .input-field {
  padding-left: 2.5rem;
}
`;

const CareSyncAuth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleAuthMode = () => setIsSignUp(!isSignUp);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserID"));
    if (user) {
      navigate("/home");
    }
  }, []);

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    console.log(import.meta.env);
    e.preventDefault();
    const apiUrl = isSignUp
      ? `${import.meta.env.VITE_BACKEND_URL}/register`
      : `${import.meta.env.VITE_BACKEND_URL}/login`;

    try {
      const response = await axios.post(apiUrl, {
        email,
        password,
      });
      if (response.data.user_details) {
        localStorage.setItem("UserID", response.data.UserID);
        navigate("/home");
      } else {
        localStorage.setItem("UserID", response.data.UserID);
        navigate("/details/user-info");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{enhancedCSS}</style>
      <Toaster />
      <div className="auth-container">
        <div className="auth-form">
          <h2 className="auth-title">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email address
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input-field"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="submit"
              className="submit-button"
            >
              {isLoading ? (
                <div className="loader" />
              ) : isSignUp ? (
                "Register"
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="toggle-auth">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={toggleAuthMode} className="toggle-auth-button">
                {isSignUp ? "Login" : "Register"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareSyncAuth;
