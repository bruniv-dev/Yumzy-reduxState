// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } =
//     useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     food_list.map((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     });
//     // console.log(orderItems);
//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     };
//     let response = await axios.post(`${url}/api/order/place`, orderData, {
//       headers: { token },
//     });
//     if (response.data.success) {
//       const { session_url } = response.data;
//       window.location.replace(session_url);
//     } else {
//       alert("Error");
//     }
//   };

//   useEffect(() => {
//     console.log(data);
//   }, [data]);

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             type="text"
//             placeholder="First Name"
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             required
//           />
//         </div>
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Street"
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           required
//         />
//         <div className="multi-fields">
//           <input
//             type="text"
//             placeholder="City"
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             required
//           />
//           <input
//             type="text"
//             placeholder="State"
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             required
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             type="text"
//             placeholder="Zip-code"
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Country"
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             required
//           />
//         </div>
//         <input
//           type="text"
//           placeholder="Phone"
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           required
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>&#8377;{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    // const frontendUrl = "http://localhost:3000";
    const frontendUrl = "https://yumzy.onrender.com";
    try {
      // Build order data to send to backend
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] };
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2, // Adding delivery charges
      };

      // Post order data to the backend
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { razorpayOrderId, amount, currency, orderId } = response.data;

        // Load Razorpay script and open checkout
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          alert("Failed to load Razorpay script. Please try again.");
          return;
        }

        const options = {
          key: "rzp_test_HACJQerHTbm9B2", // Your Razorpay Key ID
          amount: amount, // Amount in paise
          currency: currency,
          name: "Yumzy",
          description: "Test Transaction",
          image: "https://your-logo-url.com", // Optional logo
          order_id: razorpayOrderId,
          handler: async function (response) {
            alert(
              "Payment successful! Payment ID: " + response.razorpay_payment_id
            );

            window.location.replace(
              `${frontendUrl}/verify?success=true&orderId=${orderId}`
            );
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: "#f5c233",
          },
          modal: {
            ondismiss: function () {
              // Redirect the user to the cancel URL if they cancel the payment
              window.location.replace(
                `${frontendUrl}/verify?success=false&orderId=${orderId}`
              );
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Error placing order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during placeOrder:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/#explore-menu");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip-code"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
