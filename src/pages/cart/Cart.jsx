import "./cart.css";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookies, saveTokenInCookies } from "../../cookieUtils";
import NavFooter from "../../components/NavFooter/NavFooter";
import { useCart } from "../../CartContext";
import NavBar from "../../components/NavBar/NavBar";

function Cart() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    hall: "",
    seat: "",
  });
  const { cart, addToCart, removeFromCart } = useCart();
  const [errors, setErrors] = useState({
    fullname: "",
    hall: "",
    seat: "",
  });

  useEffect(() => {
    const validateForm = () => {
      setErrors({
        fullname:
          formData.fullname &&
          /^[A-Za-z0-9]([A-Za-z0-9]*)?$/.test(formData.fullname)
            ? ""
            : "Fullname required",
        hall:
          formData.hall && /^[A-Za-z0-9]([A-Za-z0-9-]*)?$/.test(formData.hall)
            ? ""
            : "Hall info required",
        seat:
          formData.seat && /^[A-Za-z0-9]([A-Za-z0-9-]*)?$/.test(formData.seat)
            ? ""
            : "Seat no. required",
      });
    };

    validateForm(); // Trigger validation whenever formData changes
  }, [formData]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  };

  const handleCheckout = async () => {
    await getTokenFromServer();
    const token = getTokenFromCookies();

    try {
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
                    <td>Rs. {item.price}</td>
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
                    <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" style={{ textAlign: "right" }}>
                    <strong>Total:</strong>
                  </td>
                  <td>Rs. {calculateTotalPrice()}</td>
                </tr>
              </tfoot>
            </table>

            <div>
              <form>
                <div className="customerDetailsField">
                  <div className="detailsItem">
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      placeholder="Your name"
                      onChange={handleChange}
                      required
                    />
                    {errors.fullname && <p>{errors.fullname}</p>}
                  </div>
                  <div className="detailsItem">
                    <input
                      type="text"
                      name="hall"
                      id="hall"
                      placeholder="Hall"
                      onChange={handleChange}
                      required
                    />
                    {errors.hall && <p>{errors.hall}</p>}
                  </div>
                  <div className="detailsItem">
                    <input
                      type="text"
                      name="seat"
                      id="seat"
                      placeholder="Seat"
                      onChange={handleChange}
                      required
                    />
                    {errors.seat && <p>{errors.seat}</p>}
                  </div>
                </div>
              </form>
            </div>

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
