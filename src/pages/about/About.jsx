import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import NavFooter from "../../components/NavFooter/NavFooter";
import "./About.css";

const About = () => {
  return (
    <>
      <NavBar />
      <div>
        <div className="AboutDiv">
          <div className="About">
            <h2>ABOUT</h2>
            <div className="AboutLogo">
              <p>
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  style={{ position: "relative", top: "-20px", left: "-20px" }}
                />
                Movie Snacks is your go-to web app for
                <br /> seamless cinema snacks ordering, ensuring
                <br />
                you never miss a moment of the movie.
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  style={{
                    position: "relative",
                    bottom: "-80px",
                    right: "-20px",
                  }}
                />
              </p>
            </div>
          </div>
          <div className="BorderCenter"></div>
          <div className="Mission">
            <h2>MISSION</h2>
            <div className="MissionLogo">
              <p>
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  style={{ position: "relative", top: "-20px", left: "-20px" }}
                />
                To enhance the movie experience by
                <br />
                simplifying snack ordering with technology.
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  style={{
                    position: "relative",
                    bottom: "-50px",
                    right: "-20px",
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <NavFooter />
    </>
  );
};

export default About;
