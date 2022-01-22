import React from "react";
import {Route, Link, Navigate} from "react-router-dom"
import { isAuthenticated } from ".";

const PrivateRoute = ({ children }) => {
  
  return isAuthenticated() ? children : <Navigate to="/signin" />;
}
   
  
  export default PrivateRoute;