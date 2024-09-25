import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import NavBar from "./components/NavBar/NavBar";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/AdminRoute/AdminRoute"; // Import AdminRoute

function App() {
  const [showLogin, setShowLogin] = useState(false);
  // const url =
  //   process.env.NODE_ENV === "development"
  //     ? "http://localhost:5000"
  //     : "https://yumzy-api.onrender.com";

  const url = "https://yumzy-api.onrender.com";

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
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
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

// import "./App.css";
// // import Header from "./components/header/header";
// import { Routes } from "react-router-dom";
// import { Route } from "react-router-dom";

// import Home from "./pages/Home/Home";
// import Cart from "./pages/Cart/Cart";
// import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
// import Footer from "./components/Footer/Footer";
// import { useState, useEffect } from "react";
// import LoginPopup from "./components/LoginPopup/LoginPopup";
// // import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Verify from "./pages/Verify/Verify";
// import MyOrders from "./pages/MyOrders/MyOrders";
// import NavBar from "./components/NavBar/NavBar";
// import AdminPanel from "./pages/AdminPanel/AdminPanel";
// import Add from "./pages/Add/Add";
// import List from "./pages/List/List";
// import Orders from "./pages/Orders/Orders";
// // import { loginSuccess } from "./reduxStore/authSlice";
// // import { useDispatch } from "react-redux";

// import { ToastContainer } from "react-toastify";
// // import AdminRoute from "./components/AdminRoute/AdminRoute";

// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const url =
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:5000"
//       : "https://yumzy-api.onrender.com";

//   return (
//     <>
//       <ToastContainer />
//       {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
//       <div className="App">
//         <NavBar setShowLogin={setShowLogin} />
//         <Routes>
//           <Route path="/" element={<Home />}></Route>
//           <Route
//             path="/cart"
//             element={<Cart setShowLogin={setShowLogin} />}
//           ></Route>
//           <Route path="/order" element={<PlaceOrder />}></Route>
//           <Route path="/verify" element={<Verify />}></Route>
//           <Route path="/myorders" element={<MyOrders />}></Route>
//           <Route path="/admin" element={<AdminPanel />}></Route>
//           <Route path="/admin/add" element={<Add url={url} />}></Route>
//           <Route path="/admin/list" element={<List url={url} />}></Route>
//           <Route path="/admin/orders" element={<Orders url={url} />}></Route>
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;
