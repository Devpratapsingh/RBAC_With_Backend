import React from "react";
import { Navigate } from "react-router-dom";

// You can replace this with actual authentication check logic
const isAuthenticated = () => {
  return localStorage.getItem("token"); // Or any other logic for checking authentication
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
