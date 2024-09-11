import { useEffect, useState } from "react";
import "../styles/useDetails.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserDetails = () => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("UserID")) {
      navigate("/login");
    }
  }, [navigate]);

  // State to store form data
  const [formData, setFormData] = useState({
    user_id: localStorage.getItem("UserID"),
    full_name: "",
    dob: "",
    age: "",
    gender: "",
    phone_number: "",
    district: "",
    state: "",
    occupation: "",
    annual_income: "",
    height: "",
    weight: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    setisloading(true);
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      age: parseInt(formData.age), // Converting age to an integer
      annual_income: parseInt(formData.annual_income), // Converting annual income to a float with 2 decimal places
      height: parseInt(formData.height), // Converting height to a float with 2 decimal places
      weight: parseInt(formData.weight), // Converting weight to a float with 2 decimal places
      user_id: parseInt(formData.user_id), // Converting weight to a float with 2 decimal places
    };
    console.log(dataToSubmit);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user-profile`,
        dataToSubmit
      );
      console.log("Form Data Submitted:", dataToSubmit);
      navigate("/details/health-info");
    } catch (error) {
      toast.error("Issue submitting form data");
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="container1">
      <Toaster />
      <div className="progress-container">
        <div className="circle active">1</div>
        <div className="line"></div>
        <div className="circle">2</div>
        <div className="line"></div>
        <div className="circle">3</div>
      </div>
      <h2>Profile setup</h2>
      <form onSubmit={handleSubmit} id="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Your Full Name:</label>
            <input
              required
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth (DOB):</label>
            <input
              required
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              required
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Gender:</label>
            <select
              required
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <div className="phone-input">
              <input required type="text" value="+91" disabled />
              <input
                required
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>District:</label>
            <input
              required
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>State:</label>
            <input
              required
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Height (in cm):</label>
            <input
              required
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Weight (in kg):</label>
            <input
              required
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Occupation:</label>
            <input
              required
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Annual Income:</label>
            <input
              required
              type="text"
              name="annual_income"
              value={formData.annual_income}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row next-button-row">
          <button type="submit" id="next-button">
            {isLoading ? <div className="loader" /> : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
