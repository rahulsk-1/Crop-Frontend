import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-success text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">🌾 Crop Advisor</h1>
          <p className="lead">
            A Smart Crop Recommendation System to Boost Your Agricultural Yield.
          </p>
          <Link to="/predict" className="btn btn-warning btn-lg fw-bold">
            Predict Best Crop 🌱
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <img
              src="https://i0.wp.com/geopard.tech/wp-content/uploads/2022/06/63.2-min.jpg?resize=1200%2C650&ssl=1"
              className="img-fluid rounded"
              alt="Farming"
            />
            <h3 className="mt-3">Smart Crop Prediction</h3>
            <p>Analyze soil nutrients, weather conditions & suggest the best crops.</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://b1721680.smushcdn.com/1721680/wp-content/uploads/2021/09/Smart-Farming-Solution-A-Sneak-Peek-into-Farming-Revolution-Primary-image-1-1200x600.jpg?lossy=0&strip=1&webp=0"
              className="img-fluid rounded"
              alt="Agriculture Tech"
            />
            <h3 className="mt-3">Data-Driven Farming</h3>
            <p>Leverage machine learning to improve agricultural productivity.</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D12AQGCWXHmBlRJtQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1723611316781?e=1747872000&v=beta&t=O0ArDVms16kJote9ueq6cJAC4-yq5kTaWLnDM1vbOwE"
              className="img-fluid rounded"
              alt="Market Trends"
            />
            <h3 className="mt-3">Crop Trend Insights</h3>
            <p>Understand the most profitable crops based on current crop trends.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h2>Start Smart Farming Today!</h2>
          <p className="lead">Get the best crop recommendations tailored to your farm.</p>
          {!localStorage.getItem("user")?(<Link to="/auth" className="btn btn-success btn-lg fw-bold">
            Sign Up Now
          </Link>):(
            <Link to="/predict" className="btn btn-success btn-lg fw-bold">
            Predict Best Crop 🌱
          </Link>
          )}
          {/* <Link to="/auth" className="btn btn-success btn-lg fw-bold">
            Sign Up Now
          </Link> */}
        </div>
      </section>
    </div>
  );
}

export default Home;
