import React from "react";
import Menu from "./Data";
import "./TopPicks.css";
import Item from "../Items/Items";
const TopPicks = () => {
  return (
    <>
      <div>
        <div>
          <h1>
            Top Picks
            <span style={{ color: "blue", fontWeight: "600px" }}>For You</span>
          </h1>
        </div>
        <div className="items topPicks">
          <div className="topPicks-item">
            {Menu.map((item, i) => {
              return (
                <Item
                  key={i}
                  id={item.id}
                  img={item.img}
                  title={item.name}
                  price={item.price}
                />
              );
            })}
          </div>
          {/* <div className="hr-line"></div> */}
        </div>
      </div>
    </>
  );
};

export default TopPicks;
