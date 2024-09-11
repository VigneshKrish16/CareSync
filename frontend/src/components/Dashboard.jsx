import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // Ensure your CSS is well organized

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = localStorage.getItem("UserID");
        if (!userID) {
          throw new Error("No user ID found");
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/${userID}`
        );
        setData(response.data);
        console.log(response.data); // Keep for debugging, remove or comment out in production
      } catch (err) {
        console.error("Dashboard fetching error:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!data) {
    return <div>No data available. Please check back later.</div>;
  }

  return (
    <div className="main-content">
      <h1>Overview</h1>
      <p>Find all your updates</p>
      <div className="top-section">
        <div className="box active-insurance">
          <div className="header">
            <h3>Active Insurance</h3>
            <div className="icon">
              <i className="insurance-icon"></i>
            </div>
          </div>
          <p className="expires-text">
            Expires on {data.insurance_expiration || "Not available"}
          </p>
          <h4 className="highlight-number">{data.insurance_count || 0}</h4>
          <div className="view-link1" onClick={() => navigate("/insurance")}>
            View Insurance <i className="arrow-right"></i>
          </div>
        </div>
        <div className="box claims">
          <div className="header">
            <h3>Claims</h3>
          </div>
          <div className="claim-details">
            {data.claims ? (
              <>
                <div className="claim-box">
                  <h4>Approved</h4>
                  <p>{data.claims.approved}</p>
                </div>
                <div className="claim-box">
                  <h4>In Review</h4>
                  <p>{data.claims.in_review}</p>
                </div>
                <div className="claim-box">
                  <h4>Rejected</h4>
                  <p>{data.claims.rejected}</p>
                </div>
              </>
            ) : (
              <p>No claim data available.</p>
            )}
          </div>
          <div className="view-link2" onClick={() => navigate("/claims")}>
            View Details <i className="arrow-right"></i>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="left-bottom">
          <div className="box health-profile">
            <h3>Your Health Profile</h3>
            <div className="status">
              {data.health_profile && data.health_profile.status ? (
                <span
                  className={`status-indicator status-color-${data.health_profile.status[0].toLowerCase()}`}
                >
                  {data.health_profile.status}
                </span>
              ) : (
                <span className="status-indicator status-color-r">
                  Unknown Status
                </span>
              )}
            </div>
            <p className="risk-contributors">
              Risk Contributors:
              <ul>
                {data.risk_contributors ? (
                  data.risk_contributors.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No risk contributors listed.</li>
                )}
              </ul>
            </p>
            <p className="hospital-visit">
              Previous hospital visit on:{" "}
              {data.last_prescription_date || "No recent visits"}
            </p>
          </div>
        </div>
        <div className="right-bottom">
          <div className="box tip">
            <div className="header">
              <h3>Tip</h3>
              <div className="icon refresh-icon">
                <i className="refresh-tip-icon"></i>
              </div>
            </div>
            <p className="tip-content">{data.tip || "No tips available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
