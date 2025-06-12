import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth");
  };
  const handlePredictClick= () =>{
      if(!localStorage.getItem("user")){
        navigate("/auth")
        return;
      }
      return;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
      <div className="container-fluid">
        {/* Website Name / Brand */}
        <Link className="navbar-brand fw-bold text-white" to="/">
          Crop Advisor 🌾
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active text-warning" : "text-white"}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active text-warning" : "text-white"}`} to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/predict" className={`nav-link ${location.pathname === "/predict" ? "active text-warning" : "text-white"}`}>
                Predict
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/price" className={`nav-link ${location.pathname === "/price" ? "active text-warning" : "text-white"}`}>
                Price
              </Link>
            </li>
          </ul>

          {/* Login / Logout Button */}
          {!localStorage.getItem("user") ? (
            <Link to="/auth" className={`btn ${location.pathname === "/auth" ? "btn-warning text-dark" : "btn-light fw-bold"}`}>
              Login / Sign Up
            </Link>
          ) : (
            <button className="btn btn-light fw-bold" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
