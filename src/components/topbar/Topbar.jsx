import { useEffect, useState } from "react";
import "./topbar.css";
import { Logout } from "@mui/icons-material";
import { getTokenFromCookies, deleteTokenFromCookies } from "../../cookieUtils";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    try {
      const token = getTokenFromCookies();

      if (!token) {
        console.log("No token found");
        return;
      }
      const currentUser = JSON.parse(atob(token.split(".")[1]));
      setUserName(currentUser.username);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div>
            <img src="/finalLogo.png" alt="MovieSnacks" className="logo" />
          </div>
          <div>
            <h3>
              Welcome &nbsp;
              <span
                style={{
                  color: "#3398b9",
                }}
              >
                {userName} !
              </span>
            </h3>
          </div>
        </div>
        <div className="topRight">
          <Link
            to="/login"
            onClick={deleteTokenFromCookies}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="topbarIconContainer">
              <Logout className="sidebarIcon" />
              <p> Logout</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
