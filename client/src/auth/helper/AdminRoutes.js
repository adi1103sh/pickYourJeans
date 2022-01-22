import React from "react"
import {Route, Link, Navigate} from "react-router-dom"
import { isAuthenticated } from "."

const AdminRoute = ({ children }) => {
  
  return isAuthenticated() && isAuthenticated().user.role === 2? children : <Navigate to="/" />;
}
   

  
  
  
  export default AdminRoute;