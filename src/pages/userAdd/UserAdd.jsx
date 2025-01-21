import "./userAdd.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "@mui/icons-material";
import { getTokenFromCookies } from "../../cookieUtils";

export default function UserAdd() {
  const token = getTokenFromCookies();
  const currentUser = JSON.parse(atob(token.split(".")[1]));
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const validateForm = () => {
      setErrors({
        username:
          formData.username &&
          /^[A-Za-z0-9]([A-Za-z0-9._-]*[A-Za-z0-9])?$/.test(formData.username)
            ? ""
            : "Username required",
        email:
          formData.email &&
          /^[A-Za-z0-9]([A-Za-z0-9._-]*[A-Za-z0-9])?@[a-z]+\.\S+$/.test(
            formData.email
          )
            ? ""
            : "Invalid email",
        password:
          formData.password &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,}$/.test(
            formData.password
          )
            ? ""
            : "Weak Password ( include lowercase, uppercase and symbols )",
      });
    };

    validateForm(); // Trigger validation whenever formData changes
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      navigate("/dashboard/users");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="addUser">
      {currentUser.isSuper ? (
        <>
          <div className="addUserTitleContainer">
            <h1 className="userTitle"> Add User</h1>
          </div>
          <form className="userFieldForm" onSubmit={handleSubmit}>
            <div className="userFormLeft">
              <div className="userFormItem">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="userFormItemInput"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  required
                />
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div className="userFormItem">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="userFormItemInput"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="userFormItem">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  className="userFormItemInput"
                  required
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
              <div className="userFormItem">
                <button type="submit" className="updateUserButton">
                  Submit
                </button>
              </div>
            </div>
            <div className="userFormRight">
              <div className="userImgUploadContainer">
                <img src="/finalLogo.png" alt="" className="userImg" />
              </div>
            </div>
          </form>
        </>
      ) : (
        <h3>You cannot access this section ! </h3>
      )}
    </div>
  );
}
