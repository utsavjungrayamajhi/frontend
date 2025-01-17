import "./addUser.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "@mui/icons-material";
import { getTokenFromCookies } from "../../cookieUtils";

export default function AddUser() {
  const token = getTokenFromCookies();
  const currentUser = JSON.parse(atob(token.split(".")[1]));
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          <form action="" className="userFieldForm" onSubmit={handleSubmit}>
            <div className="userFormLeft">
              <div className="userFormItem">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  className="userFormItemInput"
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userFormItem">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="userFormItemInput"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userFormItem">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="userFormItemInput"
                  required
                />
              </div>
              <div className="userFormItem">
                <button type="submit" className="updateUserButton">
                  Submit
                </button>
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
