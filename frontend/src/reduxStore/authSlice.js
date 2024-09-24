import { createSlice } from "@reduxjs/toolkit";

// Initialize from localStorage if available
const initialToken = localStorage.getItem("token") || null;
const initialUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: initialUserInfo, // Store user data including role
    token: initialToken,
    isAuthenticated: !!initialToken, // Set to true if token exists
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Save token and userInfo in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user)); // Store user info including role
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userInfo: null, // To store user data including role
//     token: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.userInfo = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.userInfo = null;
//       state.token = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { loginSuccess, logout } = userSlice.actions;
// export default userSlice.reducer;
