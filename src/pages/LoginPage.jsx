import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; // Import the CSS file

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const logInUser = () => {
    if (email.length === 0) {
      alert("Email has left Blank!");
    } else if (password.length === 0) {
      alert("password has left Blank!");
    } else {
      axios
        .post("http://127.0.0.1:5000/login", {
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
    }
  };

  let imgs = [
    "https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg",
  ];

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          <form className="login-form">
            <div className="form-header">
              <h2 className="form-title">Log Into Your Account</h2>
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
                <input className="checkbox" type="checkbox" id="remember" />
                <label className="checkbox-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <a href="#!" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="login-button"
                onClick={logInUser}
              >
                Login
              </button>
              <p className="signup-text">
                Don't have an account?
                <a href="/register" className="signup-link">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
