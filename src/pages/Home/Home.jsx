import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/NavBar/NavBar";
import Combo from "../../components/Combo/Combo";
import TopPicks from "../../components/TopPicks/TopPicks";
import ChooseItem from "../../components/ChooseItem/ChooseItem";
import NavFooter from "../../components/NavFooter/NavFooter";
import { useCart } from "../../CartContext";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const { addToCart, removeFromCart, getQuantity } = useCart(); // Use cart context

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

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="center-home">
        <div>
          <Combo
            foods={foods}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            getQuantity={getQuantity}
          />
        </div>

        <div>
          <ChooseItem />
        </div>
      </div>

      <NavFooter />
    </>
  );
};

export default Home;
