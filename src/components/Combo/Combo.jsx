import React from "react";
import "./Combo.css";
import Item from "../item/Item";

const Combo = ({ foods }) => {
  return (
    <div className="comboContainer">
      <h1>
        Special
        <span
          style={{
            color: "#3398b9",
            fontWeight: "600px",
          }}
        >
          Offers
        </span>
      </h1>

      <div className="items combo">
        <div className="combo-item">
          {foods.map(
            (item, i) =>
              item.category === "Combo" && (
                <Item
                  key={i}
                  id={item.id}
                  img={item.img}
                  name={item.name}
                  price={item.price}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Combo;
