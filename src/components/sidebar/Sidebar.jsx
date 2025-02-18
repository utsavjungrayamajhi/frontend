import { Link } from "react-router-dom";
import "./sidebar.css";
import {
  LineStyle,
  PersonOutline,
  PersonAdd,
  Fastfood,
  LibraryAdd,
  Logout,
} from "@mui/icons-material";
import { deleteTokenFromCookies } from "../../cookieUtils";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <div className="sidebarTitleWrapper">
            <h3 className="sidebarTitle">Dashboard</h3>
            <div className="line"></div>
          </div>
          <ul className="sidebarList">
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <div className="sidebarTitleWrapper">
            <h3 className="sidebarTitle">Users</h3>
            <div className="line"></div>
          </div>
          <ul className="sidebarList">
            <Link
              to="/dashboard/users"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem ">
                <PersonOutline className="sidebarIcon" />
                Users
              </li>
            </Link>

            <Link
              to="/dashboard/addUser"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem">
                <PersonAdd className="sidebarIcon" />
                Add User
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <div className="sidebarTitleWrapper">
            <h3 className="sidebarTitle">Food</h3>
            <div className="line"></div>
          </div>
          <ul className="sidebarList">
            <Link
              to="/dashboard/foods"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem ">
                <Fastfood className="sidebarIcon" />
                Foods
              </li>
            </Link>

            <Link
              to="/dashboard/addFood"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem">
                <LibraryAdd className="sidebarIcon" />
                Add Food
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <div className="sidebarTitleWrapper">
            <h3 className="sidebarTitle">Order</h3>
            <div className="line"></div>
          </div>
          <ul className="sidebarList">
            <Link
              to="/dashboard/orders"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem ">
                <Fastfood className="sidebarIcon" />
                Orders
              </li>
            </Link>

            {/* <Link
              to="/dashboard/addFood"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem">
                <LibraryAdd className="sidebarIcon" />
                Add Food
              </li>
            </Link> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <div className="sidebarTitleWrapper">
            <h3 className="sidebarTitle">Logout</h3>
            <div className="line"></div>
          </div>
          <ul className="sidebarList">
            <Link
              to="/login"
              onClick={deleteTokenFromCookies}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem ">
                <Logout className="sidebarIcon" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

{
  /* <li className="sidebarListItem">
  <AttachMoney className="sidebarIcon" />
  Transactions
</li> */
}
