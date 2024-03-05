import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../css/homepage.css";
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
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <LinkContainer to="/category/medications">
                <NavDropdown.Item>Medications</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/category/skin_care">
                <NavDropdown.Item>Skin Care</NavDropdown.Item>
              </LinkContainer>
              {/* Add more categories as needed */}
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
                  <LinkContainer to="/chats">
                    <Nav.Link>Message</Nav.Link>
                  </LinkContainer>
                )}
                <NavDropdown title={userInfo.user.name} id="user-nav-dropdown">
                  {/* Conditional rendering based on user role */}
                  {true ? (
                    <>
                      <LinkContainer to='/updateuserform/${session.get("user_id")'>
                        <NavDropdown.Item>Admin Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dash">
                        <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/list-product">
                        <NavDropdown.Item>Mange Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/list-category">
                        <NavDropdown.Item>Mange Categories</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : (
                    <>
                      <LinkContainer to="/updateuserform">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/displaycart">
                        <NavDropdown.Item>Cart</NavDropdown.Item>
                      </LinkContainer>
                      {/* Add more user links as needed */}
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
