import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../Combo/Combo.css";
import I from "../Items-For-choose/I";
import Categories from "./Categories";
import "./ChooseItem.css";
import { quickSort, binarySearch } from "../algorithm";

function Body({ foods }) {
  const [menuItems, setMenuItems] = useState(foods);
  const allCategories = ["all", ...new Set(foods.map((item) => item.category))];
  const [categories, setCategories] = useState(allCategories);
  const filterItems = (category) => {
    console.log(category);
    if (category === "all") {
      setMenuItems(foods);
      return;
    }
    const newItems = foods.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();

    const sortedFoods = quickSort([...foods], "name");

    const filtered = binarySearch(sortedFoods, text);

    setMenuItems(filtered);
  };

  return (
    <div className="menu-section">
      <div className="place-center">
        <h1>
          Choose
          <span
            style={{
              color: "#3398b9",
              fontWeight: "600",
            }}
          >
            Your Pick
          </span>
        </h1>
        <div className="search-i">
          <input
            type="text"
            onChange={handleSearchChange}
            className="for-item"
            placeholder="Search"
          />
          <FaSearch className="icon" />
        </div>
      </div>
      <div>
        <Categories
          foods={foods}
          categories={categories}
          filterItems={filterItems}
        />
      </div>
      <div className="choose">
        <div className="choose-item">
          {menuItems.map((it, i) => {
            return (
              <I
                key={i}
                id={it.id}
                img={it.img}
                name={it.name}
                price={it.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Body;
