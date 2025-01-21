import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Checkout from "./pages/checkout/Checkout";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import DashHome from "./pages/dashHome/DashHome";
import UserList from "./pages/userList/UserList";
import FoodList from "./pages/foodList/FoodList";
import UserEdit from "./pages/userEdit/UserEdit";
import FoodAdd from "./pages/foodAdd/FoodAdd";
import FoodEdit from "./pages/foodEdit/FoodEdit";
import Orders from "./pages/orders/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import { CartProvider } from "./CartContext";
import UserAdd from "./pages/userAdd/UserAdd";
import About from "./pages/about/About";

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
        />
        <Route
          path="/cart"
          element={
            <CartProvider>
              <Cart />
            </CartProvider>
          }
        />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route
          path="/about"
          element={
            <CartProvider>
              <About />
            </CartProvider>
          }
        />
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
                    <Route path="/addUser" element={<UserAdd />} />
                    <Route path="/editUser" element={<UserEdit />} />
                    <Route path="/foods" element={<FoodList />} />
                    <Route path="/addFood" element={<FoodAdd />} />
                    <Route path="/editFood" element={<FoodEdit />} />
                    <Route path="/orders" element={<Orders />} />
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
