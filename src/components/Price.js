import React, { useState, useEffect } from "react";
import axios from "axios";
import Result from "./Result"
function Price() {
  const [formData, setFormData] = useState({
    commodityname: "",
    month: "",
    year: "",
    average_rain_fall: "",
    confirm: false,
  });

  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setIsLoggedIn(false);
      setError("❌ You need to login first to access price prediction.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    if (!formData.confirm) {
      setError("⚠️ Please confirm to continue.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/result", formData);
      setResponse(res.data);
    } catch (err) {
      setError("🚫 Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      {!response &&
      <div className="form p-4 rounded shadow bg-white">
        <h2 className="text-center mb-4">📊 Price Prediction</h2>

        {!isLoggedIn ? (
          <div className="alert alert-warning text-center">{error}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {[
              { label: "Commodity Name", name: "commodityname", type: "text", placeholder: "e.g., Jowar" },
              { label: "Month (1-12)", name: "month", type: "number", placeholder: "e.g., 5" },
              { label: "Year", name: "year", type: "number", placeholder: "e.g., 2023" },
              { label: "Average Rainfall (mm)", name: "average_rain_fall", type: "number", step: "any", placeholder: "e.g., 67.6" }
            ].map((field) => (
              <div className="mb-3" key={field.name}>
                <label className="form-label">{field.label}</label>
                <input
                  className="form-control"
                  name={field.name}
                  type={field.type}
                  step={field.step || undefined}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                />
              </div>
            ))}

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="confirm"
                checked={formData.confirm}
                onChange={(e) => setFormData({ ...formData, confirm: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="confirm">
                Are you sure to continue?
              </label>
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="text-center">
              <button type="submit" className="btn btn-success px-4">Submit</button>
            </div>
          </form>
        )}
        </div>
      }

        {response && 
        <Result prediction={response}/>
        }

      {/* Inline styles */}
      <style>{`
        .form {
          max-width: 600px;
          margin: auto;
        }

        .btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default Price;
