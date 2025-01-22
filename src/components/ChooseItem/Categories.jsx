import React from "react";
import "./ChooseItem.css";

const Categories = ({ categories, filterItems, foods }) => {
  // Dynamically get the image of the first item in each category
  const getCategoryImage = (category) => {
    if (category === "all") {
      return foods[2].img; // Default to the first food item if available
    }
    const firstItem = foods.find((item) => item.category === category);
    return firstItem ? firstItem.img : ""; // Return the image of the first item in the category
  };

  return (
    <div className="ButtonItems">
      {categories.map((category, index) => (
        <div key={index} className="ImageButtonContainer">
          <div className="ImageButton">
            <img
              src={getCategoryImage(category)}
              alt={category}
              className="category-img"
              onClick={() => filterItems(category)}
            />
          </div>
          <p
            style={{
              textTransform: "uppercase",
              fontFamily: "Quicksand",
              fontSize: "14px",
            }}
          >
            {category}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
