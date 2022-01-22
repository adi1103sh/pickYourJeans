import React from "react";
import { Route, Routes,  BrowserRouter as Router } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes"
import AdminRoute from "./auth/helper/AdminRoutes"
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";


export default function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <UserDashBoard/>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashBoard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create/category"
          element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <ManageCategories/>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create/product"
          element={
            <AdminRoute>
              <AddProduct/>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ManageProducts/>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/update/:productid"
          element={
            <AdminRoute>
              <UpdateProduct/>
            </AdminRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}
