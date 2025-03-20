import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-success text-white text-center py-5 shadow">
        <div className="container">
          <h1 className="display-4 fw-bold">🌱 About Crop Advisor</h1>
          <p className="lead">
            Revolutionizing Agriculture with Data-Driven Crop Recommendations.
          </p>
        </div>
      </header>

      {/* About Our System - Full-Width Cards with Image on One Side */}
      <section className="container my-5">
        <h2 className="text-center mb-4">How Our System Works?</h2>

        {/* Card 1 - AI Crop Prediction */}
        <div className="row align-items-center shadow-lg mb-5 p-4 rounded">
          <div className="col-md-6">
            <img
              src="/images/about1.jpg"
              className="img-fluid rounded"
              alt="AI Crop Prediction"
              style={{height:'30vh'}}
            />
          </div>
          <div className="col-md-6 text-center">
            <h3>AI-Based Crop Prediction</h3>
            <p>
              Our ML model predicts the best crops based on <b>NPK, temperature, humidity, rainfall, and pH levels</b>.
            </p>
          </div>
        </div>

        {/* Card 2 - Secure User Authentication (Image on Right) */}
        <div className="row align-items-center shadow-lg mb-5 p-4 rounded flex-md-row-reverse">
          <div className="col-md-6">
            <img
              src="/images/about2.jpg"
              className="img-fluid rounded"
              alt="User Authentication"
            />
          </div>
          <div className="col-md-6 text-center">
            <h3>Secure User Authentication</h3>
            <p>
              Users can <b>sign up/login using bcrypt-encrypted passwords and JWT-based authentication</b> for security.
            </p>
          </div>
        </div>

        {/* Card 3 - Crop Data & Market Trends */}
        <div className="row align-items-center shadow-lg mb-5 p-4 rounded">
          <div className="col-md-6">
            <img
              src="/images/about3.jpg"
              className="img-fluid rounded"
              alt="Market Trends"
            />
          </div>
          <div className="col-md-6 text-center">
            <h3>Crop Trends & Analytics</h3>
            <p>
              We provide <b>real-time crop analytics and crop demand trends</b> to help farmers make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Used - Full-Width Cards */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Technologies We Use</h2>

        {/* Tech 1 - Flask API */}
        <div className="row align-items-center shadow-lg mb-5 p-4 rounded flex-md-row-reverse">
          <div className="col-md-6">
            <img
              src="/images/about4.jpg"
              className="img-fluid rounded"
              alt="Flask API"
            />
          </div>
          <div className="col-md-6 text-center">
            <h3>🌍 Flask API</h3>
            <p>Our backend is powered by <b>Flask with JWT authentication</b>.</p>
          </div>
        </div>

        {/* Tech 2 - Machine Learning */}
        <div className="row align-items-center shadow-lg mb-5 p-4 rounded">
          <div className="col-md-6">
            <img
              src="/images/about5.jpg"
              className="img-fluid rounded"
              alt="Machine Learning"
            />
          </div>
          <div className="col-md-6 text-center">
            <h3>📊 Machine Learning</h3>
            <p>We use <b>scikit-learn models</b> to predict the most suitable crops.</p>
          </div>
        </div>

        {/* Tech 3 - MongoDB */}
        <div className="row align-items-center shadow-lg mb-5 p-4 rounded flex-md-row-reverse">
          <div className="col-md-6">
            <img
              src="/images/about6.png"
              className="img-fluid rounded"
              alt="MongoDB"
            />
          </div>
          <div className="col-md-6 text-center">
            <h3>🛢️ MongoDB</h3>
            <p>All user data and crop predictions are stored securely in a <b>MongoDB Atlas database</b>.</p>
          </div>
        </div>

        {/* Tech 4 - React & Bootstrap */}
        <div className="row align-items-center shadow-lg mb-5 p-4 rounded">
          <div className="col-md-6">
            <img
              src="/images/about7.jpg"
              className="img-fluid rounded"
              alt="React & Bootstrap"
            />
          </div>
          <div className="col-md-6 text-center">
            <h3>⚛️ React & Bootstrap</h3>
            <p>Our frontend is built using <b>React with Bootstrap</b> for a seamless UI experience.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-light text-center py-5 shadow">
        <div className="container">
          <h2>Join Us & Improve Your Farming Efficiency</h2>
          <p className="lead">Leverage smart crop recommendations to maximize your yield!</p>
          {!localStorage.getItem("user")?(<Link to="/auth" className="btn btn-success btn-lg fw-bold">
            Sign Up Now
          </Link>):(
            <Link to="/predict" className="btn btn-success btn-lg fw-bold">
            Predict Best Crop 🌱
          </Link>
          )}
        </div>
      </section>

      {/* Hover Effect CSS */}
      <style>
        {`
          .shadow-lg {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .shadow-lg:hover {
            transform: scale(1.02);
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
          }
          @media (max-width: 768px) {
            .row.flex-md-row-reverse {
              flex-direction: column-reverse !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default About;
