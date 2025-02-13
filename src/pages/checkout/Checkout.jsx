import "./checkout.css";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTokenFromCookies } from "../../cookieUtils";
import NavFooter from "../../components/NavFooter/NavFooter";
import jsPDF from "jspdf";

function Checkout() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = getTokenFromCookies();
      const response = await fetch(
        `http://localhost:5000/api/orders/find/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  const initializePayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/epays/initialize-esewa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Payment initialization error:", error);
      return { error: error.message };
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const transactionDetails = await initializePayment();

      const form = document.createElement("form");
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      form.method = "POST";

      form.innerHTML = `

      <input type="text" id="amount" name="amount" value="${
        order ? order.totalPrice : ""
      }" required>
      <input type="text" id="tax_amount" name="tax_amount" value="0" required>
      <input type="text" id="total_amount" name="total_amount" value="${
        order ? order.totalPrice : ""
      }"  required>
      <input type="text" id="transaction_uuid" name="transaction_uuid" value="${
        transactionDetails.orderData.customerId
      }" required>
      <input type="text" id="product_code" name="product_code" value ="EPAYTEST" required>
      <input type="text" id="product_service_charge" name="product_service_charge" value="0" required>
      <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" required>
      <input type="text" id="success_url" name="success_url" value="http://localhost:5000/api/epays/complete-payment" required>
      <input type="text" id="failure_url" name="failure_url" value="https://developer.esewa.com.np/failure" required>
      <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required>
      <input type="text" id="signature" name="signature" value="${
        transactionDetails.payment.signature
      }" required>
      `;

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="checkoutContainer">
      <div className="checkoutItemDetails">
        <div className="checkoutBack">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>cancel</h1>
          </Link>
        </div>
        <div className="orderSummary">
          {order ? (
            <div className="innerOrderSummary">
              <div className="orderSummaryItem">
                <h2
                  style={{
                    margin: "0",
                    padding: "5px",
                    color: "#e3443e",
                  }}
                >
                  ORDER SUMMARY
                </h2>
              </div>
              <div className="orderSummaryItem">
                <p style={{ fontWeight: "300" }}>
                  Date: {order.createdAt.split("T")[0]}
                </p>
                <h4> Order Id: {order.id}</h4>
                <h4> Name: {order.customerName}</h4>
                <h4>
                  {order.hall}, {order.seat}
                </h4>
              </div>

              <div className="orderSummaryItem ">
                <ol className="listOfItems" type="1">
                  <h3>Food Items</h3>
                  {JSON.parse(order.foodItems).map((item, index) => (
                    <li key={index}>
                      {item.name} x {item.quantity} = Rs.
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="orderSummaryItem">
                <h4>Total: Rs. {order.totalPrice}</h4>
              </div>
              <div
                className="orderSummaryItem"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button onClick={handlePayment} className="payBtn">
                  payWithEsewa
                </button>
              </div>
            </div>
          ) : (
            <p>Loading order details...</p>
          )}
        </div>
      </div>
      <NavFooter />
    </div>
  );
}

export default Checkout;
