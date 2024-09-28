import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { PiCookingPotBold } from "react-icons/pi";
import { GiFoodTruck } from "react-icons/gi";
import { TbHomeCheck } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case "Food Processing":
        return <PiCookingPotBold className="status-icon food-processing" />;
      case "Out For Delivery":
        return <MdDeliveryDining className="status-icon out-for-delivery" />;
      case "Delivered":
        return <TbHomeCheck className="status-icon delivered" />;
      default:
        return <PiCookingPotBold className="status-icon food-processing" />;
    }
  };

  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              {/* <img src={assets.parcel_icon} alt="" /> */}
              <div className="order-status-icon">
                {getOrderStatusIcon(order.status)}
              </div>
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>&#8377;{order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span>&#x25cf; </span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>View More</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
