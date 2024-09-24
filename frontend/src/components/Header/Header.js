import React, { useContext, useState } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const Header = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="" />
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
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        {/* <HiOutlineSearch className="navbar-search-icon" /> */}
        <div className="navbar-bag-icon">
          <Link to="/cart">
            {/* <img src={assets.basket_icon} alt="" /> */}
            <IoCart className="cart-icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Log In</button>
        ) : (
          <div className="navbar-profile">
            {/* <img src={assets.profile_icon} alt="" /> */}
            <FaUser className="profile-icon" />
            <ul className="navbar-profile-dropdown">
              <li>
                <img src={assets.bag_yellow} alt="" />
                <p
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  Orders
                </p>
              </li>
              <hr />
              <li>
                <img src={assets.logout_icon} alt="" />
                <p onClick={logout}>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
