import "./editUser.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTokenFromCookies } from "../../cookieUtils";

export default function EditUser() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(state.rowData);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      const token = getTokenFromCookies();

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/users/${formData.ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      console.log("Data updated successfully");
      navigate("/dashboard/users");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="User">
      <div className="addUserTitleContainer">
        <h1 className="userTitle"> Edit User</h1>
      </div>
      <form action="" className="userFieldForm" onSubmit={handleSubmit}>
        <div className="userFormLeft">
          <div className="userFormItem">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={formData.username}
              className="userFormItemInput"
              name="username"
              id="username"
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="userFormItem">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={formData.email}
              className="userFormItemInput"
              name="email"
              id="email"
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="userFormItem">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              id="password"
              onChange={handleChange}
              className="userFormItemInput"
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
    </div>
  );
}
