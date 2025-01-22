import "./foodEdit.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UploadFile } from "@mui/icons-material";
import { getTokenFromCookies } from "../../cookieUtils";

export default function FoodEdit() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    category: "",
  });

  const token = getTokenFromCookies();
  useEffect(() => {
    // Function to fetch food data
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

  useEffect(() => {
    const validateForm = () => {
      setErrors({
        name: formData.name ? "" : "Name required",
        price:
          formData.price &&
          /^[0-9]([0-9]*\\.?[0-9])?/.test(formData.price) &&
          Number(formData.price) !== 0
            ? ""
            : "Price required",
        category: formData.category ? "" : "Category required",
      });
    };
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setImg(files[0]);
      setImgPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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
    <div className="User">
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={formData.name}
              className="userFormItemInput"
              id="name"
              name="name"
              onChange={handleChange}
              required
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="userFormItem">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              className="userFormItemInput"
              name="price"
              id="price"
              onChange={handleChange}
              required
            />
            {errors.price && <p>{errors.price}</p>}
          </div>
          <div className="userFormItem">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              value={formData.category}
              className="userFormItemInput"
              name="category"
              id="category"
              onChange={handleChange}
              required
            />
            {errors.category && <p>{errors.category}</p>}
          </div>
          <div className="userFormItem">
            <label htmlFor="available">Available</label>
            <input
              type="text"
              value={formData.available}
              name="available"
              id="available"
              onChange={handleChange}
              className="userFormItemInput"
              required
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
