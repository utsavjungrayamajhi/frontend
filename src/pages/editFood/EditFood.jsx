import "./editFood.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UploadFile } from "@mui/icons-material";
import { getTokenFromCookies } from "../../cookieUtils";

export default function EditFood() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [img, setImg] = useState(null);

  const [imgPreview, setImgPreview] = useState(""); // State to hold the image preview

  const token = getTokenFromCookies();
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/foods/find/${state.rowData}`,
          {
            method: "GET",
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setFormData(data);
        setImgPreview(data.img);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFoodData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setImg(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (files[0]) {
      setImgPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("available", formData.available || ""); // Provide a default value
      if (img) data.append("img", img); // Append image if present

      const response = await fetch(
        `http://localhost:5000/api/foods/${formData.id}`,
        {
          method: "PUT",
          headers: {
            token: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      navigate("/dashboard/foods");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Edit">
      <div className="addUserTitleContainer">
        <h1 className="userTitle"> Edit Food</h1>
      </div>
      <form
        action=""
        className="userFieldForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
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
          <div className="userFormItem">
            <label htmlFor="">Available</label>
            <input
              type="text"
              value={formData.available}
              name="available"
              onChange={handleChange}
              className="userFormItemInput"
            />
          </div>
        </div>
        <div className="userFormRight">
          <div className="userImgUploadContainer">
            <img src={imgPreview} alt="" className="userImg" />
            <label htmlFor="img">
              <UploadFile />
            </label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
          <button type="submit" className="updateUserButton">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
