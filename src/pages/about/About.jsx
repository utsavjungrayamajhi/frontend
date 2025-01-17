import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import NavFooter from "../../components/NavFooter/NavFooter";
import "./about.css";

const About = () => {
  return (
    <>
      <div>
        <NavBar />
        <div className="About-dive">
          <div className="Mission">
            <h2>ABOUT</h2>
            <img src="finalLogo.png" className="logo3" alt="logo" />
            <p>
              " Movie Snacks is your go-to web app for
              <br /> seamless cinema snacks ordering, ensuring
              <br />
              you never miss a moment of the movie !! "
            </p>
          </div>

          <div className="border-center"></div>

          <div className="arrow">
            <h2>MISSION</h2>
            <div className="About-mission-image ">
              <img src="mission.png" className="logo4" alt="logo" />
            </div>
            <p>
              " To enhance the movie experience by
              <br />
              simplifying snack ordering with technology !! "
            </p>
          </div>
        </div>
        <NavFooter />
      </div>
    </>
  );
};

export default About;
