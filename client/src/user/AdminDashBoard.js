import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  const adminLeftDashboard = () => {
    return (
      <div className="card p-4">
        <h2 className="card-title">Admin Navigation</h2>
        <ul className="list-group">
          <li className="list-group-item  ">
            <Link
              to="/admin/create/category"
              className="nav-link"
              style={{ color: "#FD297A" }}
            >
              Create Categories
            </Link>
          </li>
          <li className="list-group-item  ">
            <Link
              to="/admin/categories"
              className="nav-link"
              style={{ color: "#FD297A" }}
            >
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item ">
            <Link
              to="/admin/create/product"
              className="nav-link"
              style={{ color: "#FD297A" }}
            >
              Create Product
            </Link>
          </li>
          <li className="list-group-item ">
            <Link
              to="/admin/orders"
              className="nav-link"
              style={{ color: "#FD297A" }}
            >
              Manage Orders
            </Link>
          </li>
          <li className="list-group-item ">
            <Link
              to="/admin/products"
              className="nav-link"
              style={{ color: "#FD297A" }}
            >
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightDashboard = () => {
    return (
      <div className="card mb-4 p-4">
        <h2 className="card-title">Addtional Information</h2>
        <ul className="list-group">
          <li className="list-group-item">
          <span class="badge bg-success">Name </span> {name}
          </li>
          <li className="list-group-item"><span class="badge bg-success">Email </span> {email}</li>
         
        </ul>
        <span class="badge bg-danger">Admin Area</span> 
      </div>
    );
  };
  return (
    <Base
      title="Welcome to Admin Dashboard"
      description="Manage all the orders and products over here"
      className="container p-4 bg-secondary"
    >
      <div className="row">
        <div className="col-6"> {adminLeftDashboard()} </div>
        <div className="col-6"> {adminRightDashboard()} </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
