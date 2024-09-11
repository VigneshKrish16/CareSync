import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Visuals() {
  const [userIds, setUserIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchUserData(localStorage.getItem("UserID"));
  }, []);

  const fetchUserData = async (userId) => {
    setLoading(true);
    setError(null);
    setUserData({});

    const endpoints = [
      `http://localhost:5001/api/user_profile/${userId}`,
      `http://localhost:5001/api/health_info/${userId}`,
      `http://localhost:5001/api/lifestyle_info/${userId}`,
      `http://localhost:5001/api/ml_model_data/${userId}`,
      `http://localhost:5001/api/prediction_results/${userId}`,
    ];

    try {
      const responses = await Promise.all(
        endpoints.map((endpoint) => axios.get(endpoint))
      );
      const newUserData = {};
      responses.forEach((response) => {
        if (response.data.status === "success") {
          newUserData[response.config.url.split("/").slice(-2)[0]] =
            response.data.data;
        }
      });
      setUserData(newUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch some user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderMetricCard = (title, value, change, sparklineData) => (
    <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex justify-between items-end mb-2">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <span
          className={`text-sm ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
        </span>
      </div>
      <div className="h-16">
        <Line
          data={{
            labels: ["", "", "", "", "", ""],
            datasets: [
              {
                data: sparklineData,
                borderColor: change >= 0 ? "#10B981" : "#EF4444",
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
          }}
        />
      </div>
    </div>
  );

  const renderHealthMetrics = () => {
    if (!userData.ml_model_data) return null;
    const {
      BMI,
      Systolic_BP,
      Diastolic_BP,
      Cholesterol_Total,
      Blood_Glucose_Fasting,
    } = userData.ml_model_data;
    const data = {
      labels: [
        "BMI",
        "Systolic BP",
        "Diastolic BP",
        "Total Cholesterol",
        "Fasting Glucose",
      ],
      datasets: [
        {
          label: "Health Metrics",
          data: [
            BMI,
            Systolic_BP,
            Diastolic_BP,
            Cholesterol_Total,
            Blood_Glucose_Fasting,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Health Metrics</h2>
        <Bar
          data={data}
          options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
        />
      </div>
    );
  };

  const renderLifestyleFactors = () => {
    if (!userData.lifestyle_info) return null;
    const {
      smoking_status,
      alcohol_consumption,
      physical_activity,
      stress_level,
      sleep_hours,
    } = userData.lifestyle_info;
    const data = {
      labels: ["Smoking", "Alcohol", "Physical Activity", "Stress", "Sleep"],
      datasets: [
        {
          label: "Lifestyle Factors",
          data: [
            smoking_status === "Never"
              ? 1
              : smoking_status === "Former"
              ? 2
              : 3,
            alcohol_consumption === "None"
              ? 1
              : alcohol_consumption === "Light"
              ? 2
              : alcohol_consumption === "Moderate"
              ? 3
              : 4,
            physical_activity === "None"
              ? 1
              : physical_activity === "Light"
              ? 2
              : physical_activity === "Moderate"
              ? 3
              : 4,
            stress_level === "Low" ? 1 : stress_level === "Medium" ? 2 : 3,
            sleep_hours >= 8 ? 1 : sleep_hours >= 6 ? 2 : 3,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Lifestyle Factors
        </h2>
        <Doughnut data={data} options={{ responsive: true }} />
      </div>
    );
  };

  const renderPredictionResults = () => {
    if (!userData.prediction_results) return null;
    const sortedResults = [...userData.prediction_results]
      .sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability))
      .slice(0, 5);
    const data = {
      labels: sortedResults.map((result) => result.condition_name),
      datasets: [
        {
          label: "Risk Probability",
          data: sortedResults.map((result) => parseFloat(result.probability)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Top 5 Health Risks
        </h2>
        <Bar data={data} options={{ responsive: true, indexAxis: "y" }} />
      </div>
    );
  };

  const renderUserProfile = () => {
    if (!userData.user_profile) return null;
    const { full_name, age, gender, occupation, height, weight } =
      userData.user_profile;
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">User Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Name:</span> {full_name}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {age}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {gender}
          </p>
          <p>
            <span className="font-semibold">Occupation:</span> {occupation}
          </p>
          <p>
            <span className="font-semibold">Height:</span> {height} cm
          </p>
          <p>
            <span className="font-semibold">Weight:</span> {weight} kg
          </p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {renderMetricCard(
                "BMI",
                userData.ml_model_data?.BMI || "N/A",
                2,
                [22, 23, 22.5, 23.5, 24, 23.8]
              )}
              {renderMetricCard(
                "Blood Pressure",
                `${userData.ml_model_data?.Systolic_BP || "N/A"}/${
                  userData.ml_model_data?.Diastolic_BP || "N/A"
                }`,
                -1,
                [120, 118, 122, 119, 121, 120]
              )}
              {renderMetricCard(
                "Cholesterol",
                userData.ml_model_data?.Cholesterol_Total || "N/A",
                5,
                [180, 185, 190, 188, 192, 195]
              )}
              {renderMetricCard(
                "Blood Glucose",
                userData.ml_model_data?.Blood_Glucose_Fasting || "N/A",
                -3,
                [95, 92, 94, 91, 93, 90]
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderHealthMetrics()}
              {renderLifestyleFactors()}
            </div>
          </>
        );
      case "risks":
        return renderPredictionResults();
      case "profile":
        return renderUserProfile();
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-gray-100 min-h-screen ove"
      style={{
        overflow: "scroll",
        height: "100vh",
        overflowX: "hidden",
        padding: "0 50px",
      }}
    >
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  HealthTracker
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`${
                    activeTab === "overview"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("risks")}
                  className={`${
                    activeTab === "risks"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Health Risks
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`${
                    activeTab === "profile"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Profile
                </button>
              </div>
            </div>
            {/* <div className="flex items-center">
              <select
                value={selectedUserId}
                onChange={handleUserChange}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select User ID</option>
                {userIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-2 text-gray-600">Loading data...</p>
          </div>
        )}
        {error && (
          <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">
            {error}
          </p>
        )}

        {Object.keys(userData).length > 0 && renderContent()}
      </main>
    </div>
  );
}

export default Visuals;
