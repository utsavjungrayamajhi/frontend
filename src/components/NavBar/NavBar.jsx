import React from "react";
import { FaBars, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./navbar.css";

import { useEffect, useRef, useState } from "react";
const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  return (
    <>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <img src="finalLogo.png" className="logo" alt="logo" />
            <button className="nav-toggle" onClick={toggleLinks}>
              <FaBars />
            </button>
          </div>
          <div className="links-container" ref={linksContainerRef}>
            <ul
              className="links"
              ref={linksRef}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <li>
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "black" }}
                  className="navlink"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/login">
                  <span
                    style={{
                      position: "relative",
                      top: "2px",
                      marginRight: "5px",
                    }}
                  >
                    <FaSignOutAlt />
                  </span>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" style={{ textDecoration: "none" }}>
                  <span style={{ position: "relative", top: "2px" }}>
                    <FaShoppingCart style={{ marginRight: "5px" }} />
                  </span>
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};
export default NavBar;
