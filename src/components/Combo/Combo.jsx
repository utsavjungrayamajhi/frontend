import React from "react";
import "./Combo.css";
import Item from "../Items/Items";
import { useCart } from "../../CartContext";

const Combo = ({ foods }) => {
  const { addToCart, removeFromCart, getQuantity } = useCart();

  return (
    <div className="comboContainer">
      <h1>
        Special
        <span
          style={{
            color: "#3398B9",
            fontWeight: "600px",
          }}
        >
          Offers
        </span>
      </h1>

      <div className="items combo">
        <div className="combo-item">
          {foods.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              getQuantity={getQuantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Combo;
