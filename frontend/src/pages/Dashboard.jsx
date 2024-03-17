import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../css/dash.css";

const Dashboard = () => {
    return (
      <div className="page d-flex mt-5 justify-content-center">
        <div className="sidebar d-flex flex-column">
          <h1 className="text-center mb-4">Dashboard</h1>
          <div className="flex-grow-1 d-flex flex-column">
            <Link to="/list-product">
              <Button variant="primary" className="mb-2 w-100">
                All Products
              </Button>
            </Link>
            <Link to="/add-product">
              <Button variant="primary" className="mb-2 w-100">
                Add Product
              </Button>
            </Link>
            <Link to="/add-category">
              <Button variant="primary" className="mb-2 w-100">
                Add Category
              </Button>
            </Link>
            <Link to="/list-category">
              <Button variant="primary" className="mb-2 w-100">
                All Categories
              </Button>
            </Link>
            <Link to="/Permissionpage">
              <Button variant="primary" className="mb-2 w-100">
                Permissions
              </Button>
            </Link>
            <Link to="/updateuser">
              <Button variant="primary" className="mb-2 w-100">
                Update user
              </Button>
            </Link>
            <Link to="/User-management">
              <Button variant="primary" className="w-100">
                Users Management
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  

export default Dashboard;
