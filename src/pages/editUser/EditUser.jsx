import "./editUser.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UploadFile } from "@mui/icons-material";
import { getTokenFromCookies } from "../../cookieUtils";
export default function EditUser() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(state.rowData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={formData.username}
              className="userFormItemInput"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="userFormItem">
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={formData.email}
              className="userFormItemInput"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="userFormItem">
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="userFormItemInput"
            />
          </div>
        </div>
        <div className="userFormRight">
          <div className="userImgUploadContainer">
            <img src="/vite.svg" alt="" className="userImg" />
            <label htmlFor="file">
              <UploadFile />
            </label>
            <input type="file" id="file" style={{ display: "none" }} />
          </div>
          <button type="submit" className="updateUserButton">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
