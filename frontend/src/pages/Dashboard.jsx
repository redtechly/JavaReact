import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DashboardButton = styled(Button)`
  background-color: #007bff;
  border-color: #007bff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar>
        <Title>Dashboard</Title>
        <ButtonContainer>
          <Link to="/list-product">
            <DashboardButton>All Products</DashboardButton>
          </Link>
          <Link to="/add-product">
            <DashboardButton>Add Product</DashboardButton>
          </Link>
          <Link to="/add-category">
            <DashboardButton>Add Category</DashboardButton>
          </Link>
          <Link to="/list-category">
            <DashboardButton>All Categories</DashboardButton>
          </Link>
          <Link to="/Permissionpage">
            <DashboardButton>Permissions</DashboardButton>
          </Link>
          <Link to="/User-management">
            <DashboardButton>Users Management</DashboardButton>
          </Link>
          <Link to="/Users-orders">
            <DashboardButton>Orders</DashboardButton>
          </Link>
        </ButtonContainer>
      </Sidebar>
    </DashboardContainer>
  );
};

export default Dashboard;