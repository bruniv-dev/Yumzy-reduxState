import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useContext, useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import NavBar from "./components/NavBar/NavBar";

import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/AdminRoute/AdminRoute"; // Import AdminRoute
import { StoreContext } from "./context/StoreContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { url } = useContext(StoreContext);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="App">
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/cart"
            element={<Cart setShowLogin={setShowLogin} />}
          ></Route>
          <Route path="/order" element={<PlaceOrder />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/myorders" element={<MyOrders />}></Route>

          {/* Admin Routes - protected with AdminRoute */}

          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <Add url={url} />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/list"
            element={
              <AdminRoute>
                <List url={url} />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders url={url} />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
