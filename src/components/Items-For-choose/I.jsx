import React, { useState, useEffect } from "react";
import "./I.css";
import { useCart } from "../../CartContext";

const I = (props) => {
  const Count = () => {
    const [count, setCount] = useState(0);
    const { addToCart, removeFromCart, getQuantity } = useCart();

    useEffect(() => {
      const initialCount = getQuantity(props.id);
      setCount(initialCount);
    });

    const add = () => {
      setCount(count + 1);
      addToCart({ ...props, quantity: count + 1 });
    };

    const deduct = () => {
      if (count > 0) {
        addToCart({ ...props, quantity: count - 1 });
        setCount(count - 1);
      }
      if (count === 1) {
        removeFromCart(props.id);
        setCount(count - 1);
      }
    };
    return (
      <>
        {count ? (
          <div className="counter">
            <button onClick={deduct} className="add-btn m">
              -
            </button>

            <div className="count">{count}</div>
            <button onClick={add} className="add-btn p">
              +
            </button>
          </div>
        ) : (
          <button className="add" onClick={add}>
            Add
          </button>
        )}
      </>
    );
  };
  return (
    <div className="item1">
      <div className="logo2">
        <img
          src={props.img}
          alt=""
          className="item-img1"
          style={{ border: "none" }}
        />
      </div>
      <div className="items-price1">
        <div className="title1">
          <p>{props.name}</p>
        </div>
        <div className="price1">
          <p>Rs. {props.price}</p>
        </div>
      </div>
      <Count />
    </div>
  );
};

export default I;
