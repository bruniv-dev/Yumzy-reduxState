// import React, { useContext, useEffect, useState } from "react";
// import "./LoginPopup.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { loginSuccess } from "../../reduxStore/authSlice";
// // import {toast} from "react-toastify";
// import { useDispatch } from "react-redux";

// const LoginPopup = ({ setShowLogin }) => {
//   const { url, setToken } = useContext(StoreContext);
//   const [currentState, setCurrentState] = useState("Log In");
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };
//   ////check onChangeHandler
//   // useEffect(() => {
//   //   console.log(data);
//   // }, [data]);

//   const onLogin = async (event, dispatch) => {
//     event.preventDefault();

//     let newUrl = url;
//     if (currentState === "Log In") {
//       newUrl += "/api/user/login";
//     } else {
//       newUrl += "/api/user/register";
//     }

//     const response = await axios.post(newUrl, data);
//     if (response.data.success) {
//       const { token, role } = response.data; // Extract the token and role from the response
//       dispatch(loginSuccess({ token, user: { role } }));
//       setToken(response.data.token);
//       localStorage.setItem("token", response.data.token);
//       setShowLogin(false);
//     } else {
//       // toast.error(response.data.message);
//       alert(response.data.message);
//     }
//   };

//   return (
//     <div className="login-popup">
//       <form onSubmit={onLogin} className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>{currentState}</h2>
//           <img
//             onClick={() => setShowLogin(false)}
//             src={assets.cross_icon}
//             alt=""
//           />
//         </div>
//         <div className="login-popup-inputs">
//           {currentState === "Log In" ? (
//             <></>
//           ) : (
//             <input
//               type="text"
//               placeholder="Your Name"
//               name="name"
//               onChange={onChangeHandler}
//               value={data.name}
//               required
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Your Email"
//             name="email"
//             onChange={onChangeHandler}
//             value={data.email}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             onChange={onChangeHandler}
//             value={data.password}
//             required
//           />
//         </div>
//         <button type="submit">
//           {currentState === "Sign Up" ? "Create Account" : "Log In"}
//         </button>
//         <div className="login-popup-condition">
//           <input type="checkbox" defaultChecked required />
//           <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currentState === "Log In" ? (
//           <p>
//             Dont't Have An Account Yet?{" "}
//             <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span>
//           </p>
//         ) : (
//           <p>
//             Already Have An Account?{" "}
//             <span onClick={() => setCurrentState("Log In")}>Log In</span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;

import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { loginSuccess } from "../../reduxStore/authSlice";
// Uncomment the import below if you're using toast notifications
// import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const dispatch = useDispatch(); // Move dispatch here
  const [currentState, setCurrentState] = useState("Log In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true

    let newUrl = url;
    newUrl +=
      currentState === "Log In" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        const { token, role } = response.data; // Extract token and role from the response
        dispatch(loginSuccess({ token, user: { role } }));
        setToken(token);
        localStorage.setItem("token", token);

        // Reset form data after successful login/registration
        setData({ name: "", email: "", password: "" });
        setShowLogin(false);
      } else {
        // Uncomment the line below if you're using toast notifications
        // toast.error(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login/Registration error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : currentState === "Sign Up"
            ? "Create Account"
            : "Log In"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" defaultChecked required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Log In" ? (
          <p>
            Don't Have An Account Yet?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already Have An Account?{" "}
            <span onClick={() => setCurrentState("Log In")}>Log In</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
