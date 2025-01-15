import "./addFood.css";
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
      console.log(formData);
      const response = await fetch(`http://localhost:5000/api/foods/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add food");
      }

      navigate("/dashboard/foods");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="addUser">
      {currentUser.isSuper ? (
        <>
          <div className="addUserTitleContainer">
            <h1 className="userTitle"> Add Food Items</h1>
          </div>
          <form action="" className="userFieldForm" onSubmit={handleSubmit}>
            <div className="userFormLeft">
              <div className="userFormItem">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  className="userFormItemInput"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="userFormItem">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  className="userFormItemInput"
                  name="price"
                  onChange={handleChange}
                />
              </div>
              <div className="userFormItem">
                <label htmlFor="">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  className="userFormItemInput"
                  name="category"
                  onChange={handleChange}
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
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <h3>You cannot access this section ! </h3>
      )}
    </div>
  );
}
