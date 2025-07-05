import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; // Import the same CSS file

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = () => {
    axios
      .post("http://127.0.0.1:5000/signup", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 401) {
          alert("Invalid credentials");
        }
      });
  };

  let imgs = [
    "https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg",
  ];

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          <form className="login-form">
            <div className="form-header">
              <h2 className="form-title">Create Your Account</h2>
            </div>

            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="form-input"
                placeholder="Enter a valid email address"
                required
              />
              <label className="form-label" htmlFor="email">
                Email address
              </label>
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="form-input"
                placeholder="Enter password"
                required
              />
              <label className="form-label" htmlFor="password">
                Password
              </label>
            </div>

            <div className="form-options">
              <div className="remember-me">
                
              </div>
              
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="login-button"
                onClick={() => registerUser()}
              >
                Sign Up
              </button>
              <p className="signup-text">
                Login to your account
                <a href="/login" className="signup-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
