import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // NEW
  const navigate = useNavigate();

  const handleLoginSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required!");
      return;
    }

    if (!isLogin && password !== repassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true); // Start loading

      const endpoint = isLogin ? "/login" : "/signup";
      const response = await axios.post(`https://crop-backend-bblk.onrender.com/${endpoint}`, {
        username,
        password,
      });

      if (isLogin) {
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setIsLogin(true);
      }
    } catch (err) {
      setError("Invalid credentials or server error.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card shadow-lg">
        <div className="toggle-container">
          <button className={`toggle-btn ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={`toggle-btn ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>
            Signup
          </button>
        </div>

        <div className="card-body">
          <h3 className="text-center">{isLogin ? "Login" : "Signup"}</h3>

          {error && <p className="alert alert-danger text-center">{error}</p>}

          <form onSubmit={handleLoginSignUp}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                />
              </div>
            )}
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Login" : "Signup"}
            </button>
          </form>
        </div>
      </div>

      <style>
        {`
          .auth-container {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            position: relative;
          }

          .auth-container::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg') no-repeat center center/cover;
            filter: brightness(50%);
            z-index: -1;
          }

          .auth-card {
            width: 350px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            overflow: hidden;
          }

          .toggle-container {
            display: flex;
            justify-content: space-evenly;
            padding: 10px;
            background: rgba(0, 0, 0, 0.05);
          }

          .toggle-btn {
            border: none;
            background: none;
            font-size: 18px;
            font-weight: bold;
            color: #198754;
            cursor: pointer;
            position: relative;
            padding-bottom: 5px;
          }

          .toggle-btn.active::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            background-color: #198754;
            left: 0;
            bottom: -2px;
          }

          .card-body {
            padding: 20px;
          }

          .btn {
            transition: 0.3s;
          }

          .btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .btn:hover:not(:disabled) {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}

export default LoginSignUp;
