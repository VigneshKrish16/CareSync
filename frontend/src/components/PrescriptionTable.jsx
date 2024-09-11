import { useState } from "react";

/* eslint-disable react/prop-types */
const PrescriptionTable = ({ setPf, data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the data based on the search term
  const filteredData = data.filter(
    (item) =>
      item.clinic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            <th>File</th>
            <th>Clinic name</th>
            <th>Description</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="prescription-data">
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.filename}</td>
              <td>{item.clinic_name}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
              <td>
                <a href={item.file_link} download={true}>
                  <i
                    style={{ cursor: "pointer" }}
                    className="bx bxs-download"
                  ></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PrescriptionTable;
