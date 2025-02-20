import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./ChooseItem.css";
const Categories = ({ categories, filterItems, foods }) => {
  // Dynamically get the image of the first item in each category
  const getCategoryImage = (category) => {
    if (category === "all") {
      return foods[10].img; // Default to the first food item if available
    }
    const firstItem = foods.find((item) => item.category === category);
    return firstItem ? firstItem.img : ""; // Return the image of the first item in the category
  };
  var settings = {
    infinite: false,
    arrows: true,
    useCss: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="ButtonItems">
      <div className="slikerdiv">
        <Slider {...settings}>
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
                  fontWeight: 500,
                }}
              >
                {category}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Categories;
