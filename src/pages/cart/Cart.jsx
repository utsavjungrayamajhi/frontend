import "./cart.css";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTokenFromCookies, saveTokenInCookies } from "../../cookieUtils";
import NavBar from "../../components/NavBar/NavBar";
import NavFooter from "../../components/NavFooter/NavFooter";

function Cart() {
  // Get the cart items from the navigation state
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart;

  const [cartItems, setCartItems] = useState(location.state?.cart || []); // Default to empty array if not provided

  // Handle increase quantity
  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Number(updatedCart[index].quantity) + 1;
    setCartItems(updatedCart);
  };

  // Handle decrease quantity
  const handleDecrease = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity = Number(updatedCart[index].quantity) - 1;
      setCartItems(updatedCart);
    }
  };

  // Handle delete item
  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTokenFromServer = async () => {
    const response = await fetch(
      "http://localhost:5000/api/orders/start-session",
      {
        method: "GET",
      }
    );
    const { token } = await response.json();
    saveTokenInCookies(token);
    console.log(token);
  };

  const handleCheckout = async () => {
    await getTokenFromServer();
    const token = getTokenFromCookies();

    console.log(token);
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders/placeOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
          body: JSON.stringify({ cartItems }),
        }
      );

      if (response.ok) {
        const { id } = await response.json();
        navigate(`/checkout/${id}`);
      } else {
        console.error("Checkout failed:", response.status);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="cartContainer">
      <div className="cartBody">
        <div className="cartBodyTitle">
          <div>
            <h1>Your Cart</h1>
          </div>
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <h1>Go Back</h1>
            </Link>
          </div>
        </div>
        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="cartTable">
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        onClick={() => handleDelete(index)}
                        className="cartDeleteButton"
                      >
                        Delete
                      </button>
                    </td>
                    <td>{item.name}</td>
                    <td>Rs{item.price}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          onClick={() => handleDecrease(index)}
                          className="quantityButton minus"
                        >
                          -
                        </button>
                        <span style={{ margin: "0 15px" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(index)}
                          className="quantityButton plus"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>Rs{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" style={{ textAlign: "right" }}>
                    <strong>Total:</strong>
                  </td>
                  <td>Rs{calculateTotalPrice()}</td>
                </tr>
              </tfoot>
            </table>
          )}

          <button onClick={handleCheckout} className="proceedToCheckout">
            CHECKOUT
          </button>
        </div>
      </div>

      <NavFooter />
    </div>
  );
}

export default Cart;
