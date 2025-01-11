import React, { useEffect, useState } from "react";

import "./Home.css";
import Navbar from "../../components/NavBar/NavBar";
import Combo from "../../components/Combo/Combo";
import TopPicks from "../../components/TopPicks/TopPicks";
import ChooseItem from "../../components/ChooseItem/ChooseItem";
import NavFooter from "../../components/NavFooter/NavFooter";
const Home = () => {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/foods/", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Update quantity if item exists
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: item.quantity } // Update quantity to match the item's state
            : cartItem
        );
      }

      // Add new item if quantity > 0
      return item.quantity > 0 ? [...prevCart, item] : prevCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  return (
    <>
      <div>
        <Navbar cart={cart} />
      </div>
      <div className="center-home">
        {/* <div>
          <TopPicks />
        </div> */}
        <div>
          <Combo
            foods={foods}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>

        <div>
          <ChooseItem />
        </div>
      </div>
      <div className="footer-center">
        <NavFooter />
      </div>
    </>
  );
};
export default Home;
