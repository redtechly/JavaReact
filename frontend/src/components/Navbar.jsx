import React, { useContext } from "react";
import { listCategories } from "../services/CategoryService";
import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../css/homepage.css";
import { useQuery } from "react-query";
import { Store } from "../Store";
import { Link } from "react-router-dom";
const NavigationBar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("List Categoty", () => listCategories());
  return (
    <Navbar expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src="/images/logo.png" alt="logo" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/product">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {!isLoading &&
                categories.map((category) => (
                  <LinkContainer
                    key={category.id}
                    to={`/category/${category.id}`}
                  >
                    <NavDropdown.Item>{category.name}</NavDropdown.Item>
                  </LinkContainer>
                ))}
            </NavDropdown>
            <LinkContainer to="/about-us">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>

            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo && (
              <>
                <NavDropdown title={userInfo.user.name} id="user-nav-dropdown">
                  {/* Conditional rendering based on user role */}
                  {userInfo.user.role === "ADMIN" ? (
                    <>
                      <LinkContainer to="/Dashboard">
                        <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={`/edit-user/${userInfo.user.id}`}>
                        <NavDropdown.Item>Admin Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/list-product">
                        <NavDropdown.Item>Mange Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/list-category">
                        <NavDropdown.Item>Mange Categories</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/list-user">
                        <NavDropdown.Item>Mange Users</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : (
                    <>
                      <LinkContainer to="/chatpage">
                        <NavDropdown.Item>Message</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={`/edit-user/${userInfo.user.id}`}>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/list-orders">
                        <NavDropdown.Item>My Orders</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <div onClick={signoutHandler}>
                    <LinkContainer to="/login">
                      <NavDropdown.Item>Logout</NavDropdown.Item>
                    </LinkContainer>
                  </div>
                </NavDropdown>
              </>
            )}
            {!userInfo && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>SignUp</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
