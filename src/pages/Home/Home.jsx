import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/NavBar/NavBar";
import Combo from "../../components/Combo/Combo";
import ChooseItem from "../../components/ChooseItem/ChooseItem";
import NavFooter from "../../components/NavFooter/NavFooter";
import jsPDF from "jspdf";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);

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
        const filteredData = data.filter((item) => item.available === "yes");
        setFoods(filteredData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderDataString = urlParams.get("orderData");

    if (orderDataString) {
      const parsedOrder = JSON.parse(decodeURIComponent(orderDataString));

      // Check if the order has already been processed
      const processedOrders =
        JSON.parse(sessionStorage.getItem("processedOrders")) || [];
      if (!processedOrders.includes(parsedOrder.id)) {
        setOrderData(parsedOrder); // Set the new order data
      }
    }
  }, [window.location.search]); // Re-run when the URL changes

  useEffect(() => {
    if (!orderData) {
      return; // Skip if there's no new order data
    }

    const generateReceipt = () => {
      try {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text("Order Receipt", 95, 20);

        // Add order details
        doc.setFontSize(12);
        doc.text(`Date: ${orderData.createdAt.split("T")[0]}`, 20, 30);
        doc.text(`Order ID: ${orderData.id}`, 20, 40);
        doc.text(`Customer Name: ${orderData.customerName}`, 20, 50);
        doc.text(`Hall: ${orderData.hall}`, 20, 60);
        doc.text(`Seat: ${orderData.seat}`, 20, 70);

        // Add food items
        doc.text("Food Items:", 100, 90);
        let yPosition = 100;
        JSON.parse(orderData.foodItems).forEach((item, index) => {
          doc.text(
            `${index + 1}. ${item.name} x ${item.quantity} = Rs. ${(
              item.price * item.quantity
            ).toFixed(2)}`,
            40,
            yPosition
          );
          yPosition += 10;
        });

        // Add total price
        doc.text(`Total: Rs. ${orderData.totalPrice}`, 20, yPosition + 10);

        // Save the PDF
        doc.save(`Order_${orderData.id}_Receipt.pdf`);

        // Mark the order as processed
        const processedOrders =
          JSON.parse(sessionStorage.getItem("processedOrders")) || [];
        processedOrders.push(orderData.id);
        sessionStorage.setItem(
          "processedOrders",
          JSON.stringify(processedOrders)
        );

        setOrderData(null); // Clear the order data after generating the receipt
      } catch (error) {
        console.error("Error generating receipt:", error);
      }
    };

    generateReceipt();
  }, [orderData]);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="center-home">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              <Combo foods={foods} />
            </div>

            <div>
              <ChooseItem foods={foods} />
            </div>
          </>
        )}
      </div>

      <NavFooter />
    </>
  );
};

export default Home;
