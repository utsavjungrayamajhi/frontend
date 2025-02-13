import React, { useEffect, useState } from "react";
import "./item.css";
import { useCart } from "../../CartContext";

const Item = (props) => {
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
    <div className="item">
      <div className="logo1">
        <img src={props.img} alt="" className="item-img" />
      </div>
      <div className="items-price">
        <div className="title">
          <p>{props.name}</p>
        </div>
        <div className="price">
          <p>Rs. {props.price}</p>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default Item;
