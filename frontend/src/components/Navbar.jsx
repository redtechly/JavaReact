import React, { useContext } from "react";
import { listCategories } from "../services/CategoryService";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../css/homepage.css";
import { useQuery } from "react-query"; 
import { Store } from "../Store";
const NavigationBar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  const userid=userInfo.user.id;
 
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("List Categoty", () => listCategories());
  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>Error {error}</h1>;
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
          <NavDropdown title="Categories" id="basic-nav-dropdown">
      {categories.map((category) => (
        <LinkContainer key={category.id} to={`/category/${category.name}`}>
          <NavDropdown.Item>{category.name}</NavDropdown.Item>
        </LinkContainer>
      ))}
    </NavDropdown>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about-us">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            {userInfo && (
              <>
                {true && (
                  <LinkContainer to="/chatpage">
                    <Nav.Link >Message</Nav.Link>
                  </LinkContainer>
                )}
                <NavDropdown title={userInfo.user.name} id="user-nav-dropdown">
                  {/* Conditional rendering based on user role */}
                  {userInfo.user.role === "ADMIN" ? (
                    <>
                      <LinkContainer to="/Dashboard">
                        <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/updateuser">
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
                      <LinkContainer to={`/edit-user/${userid}`}>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/cartpage">
                        <NavDropdown.Item>Cart</NavDropdown.Item>
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
