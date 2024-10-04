import React, { useContext, useState, useEffect } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { logout as logoutAction } from "../../reduxStore/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ContactPopup from "../ContactPopup/ContactPopup";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showContactPopup, setShowContactPopup] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user information from Redux store
  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    // Log userInfo to check its contents
    console.log("User Info:", userInfo);
  }, [userInfo]);

  const logout = () => {
    localStorage.removeItem("token");
    // Dispatch Redux logout action to reset the state
    dispatch(logoutAction());
    navigate("/");
    setToken("");
    toast.success("Logged Out!");
  };

  const handleContactClick = () => {
    setMenu("contact-us");
    setShowContactPopup(true); // Show the popup
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
        <li
          onClick={() => {
            handleContactClick();
          }}
          className={`navbar-menu-item ${
            menu === "contact-us" ? "active" : ""
          }`}
        >
          contact
        </li>

        {/* Conditionally render "Add" link for admin users */}
        {userInfo?.role === "admin" && (
          <Link
            to="/admin/add"
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
          <>
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
            <p className="user-name">{userInfo.name}</p>
          </>
        )}
      </div>
      {showContactPopup && (
        <ContactPopup onClose={() => setShowContactPopup(false)} />
      )}
    </div>
  );
};

export default NavBar;
