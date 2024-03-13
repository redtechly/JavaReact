import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'

const UserManagement = () => {
  return (
    <div className="userManagementContainer">
      <h2>User Management</h2>
      <div className="userOptions">
        <Link to="/Display-users" >
          <Button variant="primary">All Users</Button>
        </Link>
        <Link to="/deleteusers" className="userOptionLink">
        <Button variant="danger">Delete Users</Button>
        </Link>
      </div>
    </div>
  );
};

export default UserManagement;