// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";
// import StoreContextProvider from "./context/StoreContext";
// import store from "./reduxStore/store";
// import { Provider } from "react-redux";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <StoreContextProvider>
//         <App />
//       </StoreContextProvider>
//     </Provider>
//   </BrowserRouter>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import store from "./reduxStore/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import Google OAuth provider

// Your Google OAuth Client ID stored in an environment variable
const googleClientId =
  "411907085715-04tl7u6bn1a4cjrcdua7q2p7aboqc98p.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={googleClientId}>
      {" "}
      {/* Wrap in GoogleOAuthProvider */}
      <Provider store={store}>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
