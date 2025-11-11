import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return sessionStorage.getItem("logged") === "true";
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/animals" replace />;
};

export default PrivateRoute;
