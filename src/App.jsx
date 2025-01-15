import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Checkout from "./pages/checkout/Checkout";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import DashHome from "./pages/dashHome/DashHome";
import UserList from "./pages/userList/UserList";
import FoodList from "./pages/foodList/FoodList";
import EditUser from "./pages/editUser/EditUser";
import AddUser from "./pages/addUser/AddUser";
import AddFood from "./pages/addFood/AddFood";
import EditFood from "./pages/editFood/EditFood";
import ProtectedRoute from "./components/ProtectedRoute";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <CartProvider>
              <Home />
            </CartProvider>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <CartProvider>
              <Cart />
            </CartProvider>
          }
        />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Topbar />
              <div className="container">
                <Sidebar />
                <div className="container-right">
                  <Routes>
                    <Route path="" element={<DashHome />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/foods" element={<FoodList />} />
                    <Route path="/addUser" element={<AddUser />} />
                    <Route path="/addFood" element={<AddFood />} />
                    <Route path="/editUser" element={<EditUser />} />
                    <Route path="/editFood" element={<EditFood />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
