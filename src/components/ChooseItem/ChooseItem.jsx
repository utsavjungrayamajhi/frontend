import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../Combo/Combo.css";
import I from "../Items-For-choose/I";
import "./ChooseItem.css";
import Menu_items from "./Data1";
import Categories from "./Categories";
const allCategories = [
  "all",
  ...new Set(Menu_items.map((item) => item.category)),
];

function Body() {
  const [menuItems, setMenuItems] = useState(Menu_items);
  const [categories, setCategories] = useState(allCategories);
  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(Menu_items);
      return;
    }
    const newItems = Menu_items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };
  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    const filterd = Menu_items.filter((item) => {
      return (
        item.title.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text)
      );
    });
    setMenuItems(filterd);
    e.preventDefault();
  };
  return (
    <div className="menu-section">
      <div className="place-center">
        <h1>
          Choose
          <span
            style={{
              color: "blue",
              fontWeight: "600px",
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
        <Categories categories={categories} filterItems={filterItems} />
      </div>
      <div className="choose">
        <div className="choose-item">
          {menuItems.map((it, i) => {
            return (
              <I
                key={i}
                id={it.id}
                img={it.img}
                title={it.title}
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
