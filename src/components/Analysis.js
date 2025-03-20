import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Adddetails from "./Adddetails";

const GOOGLE_API_KEY = "AIzaSyBZTvIFNljZJgrrzWbImy6h4UfqoS05QcA"; // Replace with your actual API key

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28AFB", "#F26D85", 
  "#7D3C98", "#27AE60", "#F39C12", "#D35400", "#C0392B", "#16A085", 
  "#2E86C1", "#9B59B6", "#1ABC9C", "#DFFF00", "#FF00FF", "#8E44AD", 
  "#3498DB", "#E74C3C", "#2ECC71", "#B7950B"
];
 // Define colors for pie chart

const Analysis = (props) => {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState("");
  const [cropData, setCropData] = useState([]);
  const [morebutton,setMorebutton] =useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCoordinates(null);
    setError("");
    setCropData([]);

    if (!location.trim()) {
      setError("Please enter a location.");
      return;
    }

    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: location,
            key: GOOGLE_API_KEY,
          },
        }
      );

      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinates({ lat, lng });

        const radiusNumber = parseFloat(radius);

        try {
          const cropResponse = await axios.post("https://crop-backend-bblk.onrender.com/crop_count", {
            latitude: lat,
            longitude: lng,
            threshold: radiusNumber,
          });

          console.log(cropResponse.data);

          // Convert crop count object into array format for recharts
          const formattedData = Object.entries(cropResponse.data.crop_counts).map(([name, value]) => ({
            name,
            value,
          }));
          setCropData(formattedData);

        } catch (err) {
          setError(err.response?.data?.error || "Something went wrong. Try again.");
        }

      } else {
        setError("No valid location found.");
      }
    } catch (err) {
      setError("Error fetching location. Try again.");
    }
  };

  return (

    <div className="container">
      <div className="col-12 text-center">
        <button className="btn btn-success px-5" onClick={()=>{setMorebutton(!morebutton)}}>More Analysis 🌱</button>
      </div>

      {morebutton && <>
      <h2>More Analysis</h2>

      <form onSubmit={handleSubmit}>
        {/* Location Input */}
        <div>
          <label>Location Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Radius Input */}
        <div>
          <label>Radius (km):</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>

      {error && <p className="alert alert-danger mt-3">{error}</p>}

      {/* Display Pie Chart if data is available */}
      {cropData.length > 0 && (
        <div className="mt-4">
          <h3>Crop Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cropData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {cropData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {props.prediction && coordinates &&
        <Adddetails prediction={props.prediction} latitude={coordinates.lat} longitude={coordinates.lng}/>
      }

</>}
    </div>
  );
};

export default Analysis;
