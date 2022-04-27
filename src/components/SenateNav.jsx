import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

// context
import { AuthContext } from "../context/AuthContext";

// routes
import {
  HOME,
  SIGN_IN,
  CREATE_ACCOUNT,
  MY_ACCOUNT,
  CONTACT_US,
  ADMIN_DASHBOARD,
} from "../routes";

// styles
import "../styles/SenateNav.scss";

// images
import LOGO from "../images/senate-logo.png";

const NavigationBar = () => {
  //state
  const [icon, setIcon] = useState(true);

  // context
  const { currentUser, currentFiscal, currentSupport, signUserOut } =
    useContext(AuthContext);

  const changeIcon = () => {
    setIcon(!icon);
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <Link to={HOME}>
              <img src={LOGO} className="senate-logo" alt="senate-logo" />
              Session Staff Application
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="custom-toggler"
            onClick={changeIcon}
          >
            <span className="custom-toggler">
              {icon ? (
                <i className="fas fa-user-circle fa-lg"></i>
              ) : (
                <i className="fas fa-times"></i>
              )}
            </span>
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              <Link to={CONTACT_US} className="nav-link">
                Contact Us
              </Link>
            </Nav>

            <Nav>
              <NavDropdown
                title={
                  currentUser
                    ? `${currentUser.displayName}`
                    : currentSupport !== null
                    ? `${currentSupport.displayName}`
                    : currentFiscal !== null
                    ? `${currentFiscal.displayName}`
                    : `Get Started`
                }
                className="custom-nav-dropdown mr-5"
              >
                {currentUser ? (
                  <div>
                    <Link to={MY_ACCOUNT} className="dropdown-item">
                      My Account
                    </Link>

                    <Link
                      to={HOME}
                      onClick={signUserOut}
                      className="dropdown-item"
                    >
                      Sign Out
                    </Link>
                  </div>
                ) : currentFiscal || currentSupport ? (
                  <div>
                    <Link to={ADMIN_DASHBOARD} className="dropdown-item">
                      My Dashboard
                    </Link>

                    <Link
                      to={HOME}
                      onClick={signUserOut}
                      className="dropdown-item"
                    >
                      Sign Out
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link to={SIGN_IN} className="dropdown-item">
                      Sign In
                    </Link>

                    <Link to={CREATE_ACCOUNT} className="dropdown-item">
                      Create Account
                    </Link>
                  </div>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="nav-bg-highlight" />
    </div>
  );
};

export default NavigationBar;
