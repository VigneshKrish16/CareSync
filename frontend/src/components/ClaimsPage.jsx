import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ClaimPage = () => {
  const [pf, setPf] = useState(false);
  const [claimList, setClaimList] = useState([]);
  useEffect(() => {
    const funck = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/claim/retrieve_claims/` +
          localStorage.getItem("UserID")
      );
      if (response.data) {
        setClaimList(response.data);
      }
    };
    funck();
  }, [pf]);
  console.log(pf);
  return (
    <div className="main-content" style={{ width: "95%" }}>
      <div className="header">
        <h1>Insurance Claim</h1>
      </div>
      <div className="dynamic">
        {claimList.length < 1 && (
          <div
            onClick={() => {
              setPf(!pf);
            }}
            className="first"
          >
            <button id="add-button" className="add-btn">
              <i className="bx bx-plus"></i>
              <p style={{ marginTop: "40px" }}>Upload Your Bill</p>
            </button>
          </div>
        )}
        <div
          id="popup-form"
          className="popup-form"
          style={
            pf ? { display: "block", marginTop: "200px" } : { display: "none" }
          }
        >
          <ClaimForm
            setClaimList={setClaimList}
            setPf={setPf}
            claimList={claimList}
          />
        </div>
        <div
          className="second"
          style={
            claimList.length > 0 ? { display: "block" } : { display: "none" }
          }
        >
          <ClaimTable data={claimList} setPf={setPf} />
        </div>
      </div>
    </div>
  );
};

const ClaimForm = ({ setPf, claimList, setClaimList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    user_id: localStorage.getItem("UserID"),
    bill_file: undefined,
    reason_for_treatment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a FormData object to handle the file upload
    const formData = new FormData();
    formData.append("user_id", parseInt(localStorage.getItem("UserID")));
    formData.append("bill_file", data.bill_file);
    formData.append("reason_for_treatment", data.reason_for_treatment);

    toast
      .promise(
        axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/claim/process_claim`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        ),
        {
          loading: "Uploading Bill...",
          success: "Bill uploaded successfully!",
          error: "Error uploading Bill. Please try again.",
        }
      )
      .then((response) => {
        // Reset the form data after successful submission
        setData({
          user_id: parseInt(localStorage.getItem("UserID")),
          bill_file: undefined,
          reason_for_treatment: "",
        });
        setIsLoading(false);
        setPf(false); // Close the form
      })
      .catch((error) => {
        console.error("Error uploading Bill:", error);
      });
    /* const newData = {
      bill: data.bill_file.name,
      status: "Pending",
      reason: "chumma",
      date: new Date().toLocaleDateString(),
    };
    setClaimList([...claimList, newData]);
    setIsLoading(false);
    setPf(false); */
  };

  return (
    <form id="prescription-form" onSubmit={handleSubmit}>
      <Toaster />
      <div className="file-upload-container">
        <label className="file-upload-label">
          <i className="bx bx-upload"></i> Drag and drop or upload files
          <input
            type="file"
            id="file-upload"
            name="bill_file"
            className="file-upload"
            onChange={(e) => {
              setData({ ...data, bill_file: e.target.files[0] });
              console.log(data);
            }}
            required
          />
        </label>
      </div>
      <label htmlFor="reason_for_treatment">Reason For Treatment</label>
      <textarea
        id="reason_for_treatment"
        name="reason_for_treatment"
        value={data.reason_for_treatment}
        placeholder="Message text goes here"
        rows="5"
        onChange={(e) =>
          setData({ ...data, reason_for_treatment: e.target.value })
        }
        required
      ></textarea>
      <button type="submit" className="upload-btn">
        {isLoading ? <div className="loader" /> : "Upload"}
      </button>
    </form>
  );
};

/* eslint-disable react/prop-types */
const ClaimTable = ({ setPf, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(data);
  // Filter the data based on the search term
  const filteredData = data.filter(
    (item) =>
      item.bill_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.includes(searchTerm)
  );

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search ..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
        />
      </div>
      <button
        onClick={() => {
          setPf(true);
        }}
        id="new-btn"
        className="new-btn"
      >
        New
      </button>
      <table>
        <thead>
          <tr>
            <th>Bill</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="prescription-data">
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.bill_name}</td>
              <td>{item.status}</td>
              <td>{item.reason}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClaimPage;
