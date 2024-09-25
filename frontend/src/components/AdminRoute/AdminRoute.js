// import { Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// // A higher-order component (HOC) to protect admin routes
// const AdminRoute = ({ component: Component, ...rest }) => {
//   const { userInfo } = useSelector((state) => state.user);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         userInfo && userInfo.role === "admin" ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/home" />
//         )
//       }
//     />
//   );
// };

// export default AdminRoute;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// AdminRoute component for role-based protection
const AdminRoute = ({ children }) => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  // Check if the user is authenticated and has the admin role
  if (!isAuthenticated || userInfo?.role !== "admin") {
    // If not, redirect to the home or login page
    return <Navigate to="/" />;
  }

  // If the user is an admin, render the admin content
  return children;
};

export default AdminRoute;
