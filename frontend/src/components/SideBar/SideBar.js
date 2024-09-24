import React from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
// import { GiCookingPot } from "react-icons/gi";
import { GiCook } from "react-icons/gi";
import { IoIosListBox } from "react-icons/io";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/admin/add" className="sidebar-option">
          <img src={assets.add_yellow} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/admin/list" className="sidebar-option">
          <IoIosListBox className="list_icon" />
          <p>Food List</p>
        </NavLink>
        <NavLink to="/admin/orders" className="sidebar-option">
          <GiCook className="orders_icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
