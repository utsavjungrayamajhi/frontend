import "./cart.css";
import { Link, NavLink } from "react-router-dom";

import React from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookies, saveTokenInCookies } from "../../cookieUtils";
import NavFooter from "../../components/NavFooter/NavFooter";
import { useCart } from "../../CartContext";
import NavBar from "../../components/NavBar/NavBar";

function Cart() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();

  // Handle increase quantity
  const handleIncrease = (item) => {
    addToCart({ ...item, quantity: item.quantity + 1 });
  };

  // Handle decrease quantity
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: item.quantity - 1 });
    }
  };

  // Handle delete item
  const handleDelete = (id) => {
    removeFromCart(id);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart
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

    try {
      console.log(JSON.stringify(cart));
      const response = await fetch(
        "http://localhost:5000/api/orders/placeOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
          body: JSON.stringify(cart),
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
      <div>
        <NavBar />
      </div>
      <div className="cartBody">
        {cart.length === 0 ? (
          <>
            <p>Your cart is empty !</p>
            <Link to="/">
              <button className="proceedToCheckout">Go Back</button>
            </Link>
          </>
        ) : (
          <>
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
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                          onClick={() => handleDecrease(item)}
                          className="quantityButton minus"
                        >
                          -
                        </button>
                        <span style={{ margin: "0 15px" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item)}
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
            <button onClick={handleCheckout} className="proceedToCheckout">
              CHECKOUT
            </button>
          </>
        )}
      </div>

      <NavFooter />
    </div>
  );
}

export default Cart;
