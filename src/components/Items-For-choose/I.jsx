import React, { useState } from "react";
import "./I.css";
const I = (props) => {
  const Count = () => {
    const [count, setCount] = useState(0);
    const add = () => {
      setCount(count + 1);
    };

    const deduct = () => {
      if (count === 0) setCount(0);
      else setCount(count - 1);
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
          <p>{props.title}</p>
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
