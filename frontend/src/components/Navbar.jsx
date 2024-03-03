import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../css/homepage.css";
const NavigationBar = () => {
  return (
    <Navbar expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/home">
          <Navbar.Brand>
            <img src="/images/logo.png" alt="logo" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
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
            {/* Conditional rendering based on user session */}
            {true && (
              <>
                {true && (
                  <LinkContainer to="/chats">
                    <Nav.Link>Message</Nav.Link>
                  </LinkContainer>
                )}
                <NavDropdown title={"user_name"} id="user-nav-dropdown">
                  {/* Conditional rendering based on user role */}
                  {true ? (
                    <>
                      <LinkContainer to='/updateuserform/${session.get("user_id")'>
                        <NavDropdown.Item>Admin Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dash">
                        <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
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
                  <LinkContainer to="/logout">
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </>
            )}
            {false && (
              <>
                <LinkContainer to="/loginform">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signupform">
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
