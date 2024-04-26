import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoute = ({isAuthenticated,adminRoute, isAdmin}) => {
  const { user } = useSelector((state) => state.user);
  if(isAuthenticated === false){
    return <Navigate to="/login" />
  }
  if(isAdmin === true && user.role !== "admin" && adminRoute){
    return <Navigate to="/" />
  }
  return <Outlet />;
};

export default ProtectedRoute;