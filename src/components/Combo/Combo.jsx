import React from "react";

import "./Combo.css";
import menu from "./Data";
import Item from "../Items/Items";
const Combo = ({ foods, addToCart, removeFromCart }) => {
  return (
    <div className="comboContainer">
      <h1>
        Special
        <span
          style={{
            color: "blue",
            fontWeight: "600px",
          }}
        >
          Offers
        </span>
      </h1>

      <div className="items combo">
        <div className="combo-item">
          {foods.map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                img={item.img}
                name={item.name}
                price={item.price}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Combo;
