import React, { useState, useEffect } from "react";
import axios from "axios";

const Adddetails = ({ prediction,latitude,longitude }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [message, setMessage] = useState("");
  const [crops, setCrops] = useState([]);

  // Convert object to array format when `prediction` updates
  useEffect(() => {
    console.log("Received Prediction:", prediction);

    if (prediction && typeof prediction === "object") {
      setCrops(Object.entries(prediction)); // Converts {Rice: 96, Jute: 4} to [["Rice", 96], ["Jute", 4]]
    } else {
      setCrops([]); // Fallback to empty array
    }
  }, [prediction]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setSelectedCrop(""); // Reset selection when unchecked
    setMessage(""); // Clear messages
  };

  const handleSubmit = async () => {
    if (!selectedCrop) {
      setMessage("Please select a crop before submitting.");
      return;
    }

    try {
      const response = await axios.post("https://crop-backend-bblk.onrender.com/add_details", {
        crop_name: selectedCrop.toLowerCase(),
        username: localStorage.getItem("user"),
        latitude:latitude,
        longitude:longitude
      });

      setMessage(response.data.message || "Details submitted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="mt-4">
      <h3>Share Your Crop Selection</h3>

      {/* Checkbox */}
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="shareCropCheckbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="shareCropCheckbox">
          Would you like to share what you will be growing?
        </label>
      </div>

      {/* Dropdown for crop selection (Visible only if checkbox is checked) */}
      {isChecked && (
        <div className="mt-3">
          <label>Select Crop:</label>
          <select
            className="form-control"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="">-- Select a Crop --</option>
            {crops.map(([crop, probability], index) => (
              <option key={index} value={crop}>
                {crop} ({probability}%)
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <button className="btn btn-success mt-3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {/* Status Message */}
      {message && <p className="alert alert-info mt-3">{message}</p>}
    </div>
  );
};

export default Adddetails;
