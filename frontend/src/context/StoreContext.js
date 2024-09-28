// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   // const url = "http://localhost:5000";
//   // const url = "https://yumzy-api.onrender.com";

//   const url =
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:5000"
//       : "https://yumzy-api.onrender.com";

//   const [token, setToken] = useState("");
//   const [food_list, setFoodList] = useState([]);

//   const fetchFoodList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);
//     setFoodList(response.data.data);
//   };

//   const loadCartData = async (token) => {
//     const response = await axios.post(
//       `${url}/api/cart/get`,
//       {},
//       { headers: { token } }
//     );
//     setCartItems(response.data.cartData);
//   };

//   const addToCart = async (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//     if (token) {
//       await axios.post(
//         `${url}/api/cart/add`,
//         { itemId },
//         { headers: { token } }
//       );
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (token) {
//       await axios.post(
//         `${url}/api/cart/remove`,
//         { itemId },
//         { headers: { token } }
//       );
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   // useEffect(() => {
//   //   console.log(cartItems);
//   // }, [cartItems]);

//   // to avoid logout during reload page, set token on reload
//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       if (localStorage.getItem("token")) {
//         setToken(localStorage.getItem("token"));
//         await loadCartData(localStorage.getItem("token"));
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://yumzy-api.onrender.com";

  // const url = "https://yumzy-api.onrender.com";

  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Token from localStorage
  const [food_list, setFoodList] = useState([]);

  // Fetch the food list from the API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load cart data from the API if token is available
  const loadCartData = async (token) => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Add an item to the cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId] -= 1;
      }
      return updatedCart;
    });
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Calculate the total amount of items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    if (food_list.length === 0) return totalAmount; // Ensure food list is loaded
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // useEffect to load food list and cart data after reload
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList(); // Ensure food list is loaded first
      if (token) {
        await loadCartData(token); // Load cart if token exists
      }
    };
    loadData();
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
