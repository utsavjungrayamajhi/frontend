import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokenInCookies } from "../../cookieUtils";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg);
      }

      const { accessToken } = await response.json();
      saveTokenInCookies(accessToken);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-header">
        <img src="finalLogo.png" alt="" className="login-img" />
        <a href="/" className="backToHome">
          Back to home
        </a>
      </div>
      <div className="loginContainer">
        <div className="centerContainer">
          <h1 className="login-title">LOGIN</h1>
          <form onSubmit={handleSubmit} className="form-handle">
            <div className="form-handle-items">
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="Username"
                className="loginField"
                onChange={handleChange}
              />
            </div>

            <div className="form-handle-items">
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                className="loginField"
                onChange={handleChange}
              />
            </div>

            <div className="form-handle-items">
              <button type="submit" className="log-btn">
                Login
              </button>
            </div>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
