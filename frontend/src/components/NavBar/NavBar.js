// import React, { useContext, useState } from "react";
// import "./NavBar.css";
// import { assets } from "../../assets/assets";
// import { Link, useNavigate } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";
// import { IoCart } from "react-icons/io5";
// import { FaUser } from "react-icons/fa";

// const NavBar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("home");
//   const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
//   const navigate = useNavigate();
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img className="logo" src={assets.logo} alt="" />
//       </Link>
//       <ul className="navbar-menu">
//         <Link
//           to="/"
//           onClick={() => setMenu("home")}
//           className={`navbar-menu-item ${menu === "home" ? "active" : ""}`}
//         >
//           home
//         </Link>
//         <a
//           href="#explore-menu"
//           onClick={() => {
//             setMenu("menu");
//             navigate("/#explore-menu");
//           }}
//           className={`navbar-menu-item ${menu === "menu" ? "active" : ""}`}
//         >
//           menu
//         </a>
//         <a
//           href="#app-download"
//           onClick={() => {
//             setMenu("app");
//             navigate("/#app-download");
//           }}
//           className={`navbar-menu-item ${menu === "app" ? "active" : ""}`}
//         >
//           app
//         </a>
//         <a
//           href="#footer"
//           onClick={() => {
//             setMenu("contact-us");
//             navigate("/#footer");
//           }}
//           className={`navbar-menu-item ${
//             menu === "contact-us" ? "active" : ""
//           }`}
//         >
//           contact
//         </a>
//       </ul>
//       <div className="navbar-right">
//         {/* <img src={assets.search_icon} alt="" /> */}
//         {/* <HiOutlineSearch className="navbar-search-icon" /> */}
//         <div className="navbar-bag-icon">
//           <Link to="/cart">
//             {/* <img src={assets.basket_icon} alt="" /> */}
//             <IoCart className="cart-icon" />
//           </Link>
//           <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//         </div>
//         {!token ? (
//           <button onClick={() => setShowLogin(true)}>Log In</button>
//         ) : (
//           <div className="navbar-profile">
//             {/* <img src={assets.profile_icon} alt="" /> */}
//             <FaUser className="profile-icon" />
//             <ul className="navbar-profile-dropdown">
//               <li>
//                 <img src={assets.bag_yellow} alt="" />
//                 <p
//                   onClick={() => {
//                     navigate("/myorders");
//                   }}
//                 >
//                   Orders
//                 </p>
//               </li>
//               <hr />
//               <li>
//                 <img src={assets.logout_icon} alt="" />
//                 <p onClick={logout}>Logout</p>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import React, { useContext, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { logout as logoutAction } from "../../reduxStore/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user information from Redux store
  const userInfo = useSelector((state) => state.user.userInfo);

  const logout = () => {
    localStorage.removeItem("token");
    // Dispatch Redux logout action to reset the state
    dispatch(logoutAction());
    navigate("/");
    setToken("");
    toast.success("Logged Out!");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`navbar-menu-item ${menu === "home" ? "active" : ""}`}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
            navigate("/#explore-menu");
          }}
          className={`navbar-menu-item ${menu === "menu" ? "active" : ""}`}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setMenu("app");
            navigate("/#app-download");
          }}
          className={`navbar-menu-item ${menu === "app" ? "active" : ""}`}
        >
          app
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("contact-us");
            navigate("/#footer");
          }}
          className={`navbar-menu-item ${
            menu === "contact-us" ? "active" : ""
          }`}
        >
          contact
        </a>

        {/* Conditionally render "Add" link for admin users */}
        {userInfo?.role === "admin" && (
          <Link
            to="/admin"
            onClick={() => setMenu("add")}
            className={`navbar-menu-item ${menu === "add" ? "active" : ""}`}
          >
            Admin Panel
          </Link>
        )}
      </ul>

      <div className="navbar-right">
        <div className="navbar-bag-icon">
          <Link to="/cart">
            <IoCart className="cart-icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Log In</button>
        ) : (
          <div className="navbar-profile">
            <FaUser className="profile-icon" />
            <ul className="navbar-profile-dropdown">
              <li>
                <img src={assets.bag_yellow} alt="Orders" />
                <p
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  Orders
                </p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
