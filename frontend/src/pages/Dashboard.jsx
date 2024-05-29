import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../css/dash.css";

const Dashboard = () => {
  return (
    <div className="page d-flex mt-5 justify-content-center">
      <div className="sidebar d-flex flex-column">
        <h1 className="text-center mb-4">Dashboard</h1>
        <div className="button-grid">
          <Link to="/list-product">
            <Button variant="primary" className="squared-button">
              <img src="images/feature.png" alt="List Product" className="button-icon" />
              All Products
            </Button>
          </Link>
          <Link to="/add-product">
            <Button variant="primary" className="squared-button">
              <img src="images/add-product.png" alt="Add Product" className="button-icon" />
              Add Product
            </Button>
          </Link>
          <Link to="/add-category">
            <Button variant="primary" className="squared-button">
              <img src="images/add.png" alt="Add Category" className="button-icon" />
              Add Category
            </Button>
          </Link>
          <Link to="/list-category">
            <Button variant="primary" className="squared-button">
              <img src="images/feature.png" alt="List Category" className="button-icon" />
              All Categories
            </Button>
          </Link>
          <Link to="/Permissionpage">
            <Button variant="primary" className="squared-button">
              <img src="images/lock.png" alt="Permissions" className="button-icon" />
              Permissions
            </Button>
          </Link>
          <Link to="/User-management">
            <Button variant="primary" className="squared-button">
              <img src="images/management.png" alt="User Management" className="button-icon" />
              Users Management
            </Button>
          </Link>
          <Link to="/Users-orders">
            <Button variant="primary" className="squared-button">
              <img src="images/package.png" alt="Orders" className="button-icon" />
              Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
