import React from "react";
import footimg from "../../Images/footimg.jpg";
import "./NavFooter.css";
const NavFooter = () => {
  return (
    <div className="footer-center">
      <img src="finalLogo.png" alt="" className="footerlogo L" />
      <div className="text">
        <p style={{ color: "#E34440" }}>Avoid Queue</p>
        <p style={{ color: "#3398B9" }}>Place Order</p>
        <p style={{ color: "#000000" }}>Enjoy !</p>
      </div>
      <img src={footimg} className="footerlogo I" alt="" />
    </div>
  );
};

export default NavFooter;
