import React, { useEffect } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/Actions/userActions";
import { LoadCurrentUser } from "../../Redux/Actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.userAuthReducer);
  const { isAuthenticated, token, user } = userRed;

  useEffect(() => {
    dispatch(LoadCurrentUser());
  }, [dispatch, token]);

  const logoutHandler = () => {
    dispatch(Logout());
  };

  return (
    <div className="header__main">
      <Navbar bg="dark" fixed="top" expand="md" variant="dark">
        <Container>
          <NavLink className="navbar-brand" to="/">
            MernSocial
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <NavLink className="nav-link header__link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link header__link" to="/discussion">
                Discussion
              </NavLink>
              {isAuthenticated === true ? (
                <>
                  <NavLink className="nav-link header__link" to="/profile">
                    {user === null ? "loading" : user.name}
                  </NavLink>
                  <NavLink
                    onClick={logoutHandler}
                    className="nav-link header__link"
                    to="/login"
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-link header__link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link header__link" to="/register">
                    Register
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
