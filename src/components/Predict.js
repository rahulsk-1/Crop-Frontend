import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Analysis from "./Analysis";
import Adddetails from "./Adddetails";

const cropDict = {
  "Rice": "rice.jpg",
  "Maize": "maize.jpeg",
  "Jute": "jute.jpg",
  "Cotton": "cotton.jpg",
  "Coconut": "coconut.jpg",
  "Papaya": "papaya.jpg",
  "Orange": "orange.jpg",
  "Apple": "apple.jpg",
  "Muskmelon": "muskmelon.jpg",
  "Watermelon": "watermelon.jpg",
  "Grapes": "grapes.jpg",
  "Mango": "mango.jpg",
  "Banana": "banana.jpg",
  "Pomegranate": "pomegranate.jpg",
  "Lentil": "lentil.jpg",
  "Blackgram": "blackgram.jpg",
  "Mungbean": "mungbean.jpg",
  "Mothbeans": "mothbeans.jpg",
  "Pigeonpeas": "pigeonpeas.jpg",
  "Kidneybeans": "kidneybeans.jpg",
  "Chickpea": "chickpea.jpg",
  "Coffee": "coffee.jpg"
};

function Predict() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    rainfall: "",
    temperature: "",
    humidity: "",
    ph: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const[predictedCrop,setPredictedCrop] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
      if(!localStorage.getItem("user")){
        setError("You Need to Login First !!!");
        
      }
  },[localStorage.getItem("user")])

  // Handle prediction API call
  const handlePrediction = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);
    if(!localStorage.getItem("user")){
        navigate("/auth")
        return;
    }

    try {
      const response = await axios.post("https://crop-backend-bblk.onrender.com/crop_predict", formData);
      setPrediction(response.data.prob_dict);
      setPredictedCrop(response.data.crop)
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="prediction-container">
      <div className="container">
        {localStorage.getItem("user") && <>
        <h2 className="text-center mb-4">🌾 Crop Prediction</h2>

        <form className="row g-3 justify-content-center" onSubmit={handlePrediction}>
          {[
            { label: "Nitrogen (0-250)", name: "nitrogen", min:0 ,max: 250  },
            { label: "Phosphorous (0-250)", name: "phosphorus", min:0 ,max: 250  },
            { label: "Potassium (0-250)", name: "potassium", min:0 ,max: 250  },
            { label: "Rainfall (0-500 mm)", name: "rainfall", min:0 ,max: 500 },
            { label: "Temperature (0-50 °C)", name: "temperature", min:0 ,max: 50 },
            { label: "Humidity (0-100%)", name: "humidity", min:0 ,max: 100},
            { label: "pH (1-14)", name: "ph", min:1 ,max: 14},
          ].map((field) => (
            <div className="col-md-6" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                type="number"
                className="form-control"
                name={field.name}
                value={formData[field.name]}
                step="any"
                min={field.min}
                max={field.max}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                required
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="col-12 text-center">
            <button className="btn btn-success px-5">Predict 🌱</button>
          </div>
        </form>
        </>
}
        {error && <p className="alert alert-danger text-center mt-3">{error}</p>}

        {prediction && (
          <div className="mt-3">
            <h4 className="text-center">🌿 Recommended Crops:</h4>

            {/* Stacked Bar */}
            <div className="progress my-3 position-relative">
              {Object.entries(prediction).map(([crop, probability], index) => (
                <div
                  key={crop}
                  className="progress-bar crop-bar"
                  role="progressbar"
                  style={{
                    width: `${probability}%`,
                    backgroundColor: `hsl(${index * 50}, 70%, 50%)`,
                    borderRight: "1px solid white"
                  }}
                  aria-valuenow={probability}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              ))}
            </div>

            {/* Crop Legend Below the Bar (Now Responsive) */}
            <div className="crop-legend">
              {Object.entries(prediction).map(([crop,probability], index) => (
                <div key={crop} className="legend-item">
                  <div
                    className="color-box"
                    style={{ backgroundColor: `hsl(${index * 50}, 70%, 50%)` }}
                  />
                  <span className="crop-name">{`${crop} (${probability}%)`}</span>
                </div>
              ))}
            </div>

            {/* Crop Cards */}
            <div className="row justify-content-center mt-3">
              {Object.entries(prediction).map(([crop, probability]) => {
                const imagePath = cropDict[crop];
                if (!imagePath) return null;

                return (
                  <div key={crop} className="col-md-4 text-center mb-3">
                    <div className="card">
                      <img src={`/images/${imagePath}`} alt={crop} className="card-img-top crop-img" />
                      <div className="card-body">
                        <h5 className="card-title">{crop}</h5>
                        <p className="card-text"><strong>{probability}%</strong> suitability</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {prediction && 
        <Analysis prediction={prediction}/>
        } 
      </div>

      {/* Styles */}
      <style>
        {`
          .container {
            background: rgba(255, 255, 255, 0.9);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .btn:hover {
            transform: scale(1.05);
          }

          .progress {
            height: 30px;
            position: relative;
          }

          .progress-bar {
            transition: opacity 0.2s ease-in-out;
          }

          .crop-legend {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 14px;
          }

          .color-box {
            width: 18px;
            height: 18px;
            border-radius: 4px;
          }

          .crop-img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }

          .card {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          @media (max-width: 768px) {
            .legend-item {
              font-size: 12px;
            }

            .color-box {
              width: 14px;
              height: 14px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Predict;
