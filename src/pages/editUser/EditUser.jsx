import "./editUser.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UploadFile } from "@mui/icons-material";
import { getTokenFromCookies } from "../../cookieUtils";

export default function EditUser() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(state.rowData);
  const [selectedFile, setSelectedFile] = useState(null); // For handling file upload
  const [imagePreview, setImagePreview] = useState(
    formData.profileImage || "/vite.svg"
  ); // Default or existing image path

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getTokenFromCookies();

      if (!token) {
        console.log("No token found");
        return;
      }

      // Use FormData for file and text data
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (selectedFile) {
        formDataToSend.append("profileImage", selectedFile); // Append file
      }

      const response = await fetch(
        `http://localhost:5000/api/users/${formData.ID}`,
        {
          method: "PUT",
          headers: {
            token: `Bearer ${token}`,
          },
          body: formDataToSend,
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
          <div className="userFormItem">
            <button type="submit" className="updateUserButton">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
