import "./addFood.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "@mui/icons-material";
import { getTokenFromCookies } from "../../cookieUtils";

export default function AddFood() {
  const token = getTokenFromCookies();
  const currentUser = JSON.parse(atob(token.split(".")[1]));
  const [formData, setFormData] = useState({});
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState("/finalLogo.png"); // State to hold the image preview
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setImg(files[0]); // Set the file for the image
      setImgPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
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

      // Prepare form data for submission
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (img) data.append("img", img); // Append image if present

      const response = await fetch(`http://localhost:5000/api/foods/add`, {
        method: "POST",
        headers: {
          token: `Bearer ${token}`,
        },
        body: data, // Send FormData as the request body
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
    <div className="addFood">
      {currentUser.isSuper ? (
        <>
          <div className="addFoodTitleContainer">
            <h1 className="foodTitle"> Add Food Items</h1>
          </div>
          <form
            className="foodFieldForm"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="foodFormLeft">
              <div className="foodFormItem">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  className="foodFormItemInput"
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div className="foodFormItem">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  className="foodFormItemInput"
                  name="price"
                  id="price"
                  onChange={handleChange}
                />
                {errors.price && <p>{errors.price}</p>}
              </div>
              <div className="foodFormItem">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  className="foodFormItemInput"
                  name="category"
                  id="category"
                  onChange={handleChange}
                />
                {errors.category && <p>{errors.category}</p>}
              </div>
            </div>
            <div className="foodFormRight">
              <div className="foodImgUploadContainer">
                <img src={imgPreview} alt="" className="foodImg" />
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
              <button type="submit" className="updateFoodButton">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <h3>You cannot access this section!</h3>
      )}
    </div>
  );
}
