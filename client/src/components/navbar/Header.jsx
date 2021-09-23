import React, { useContext, useEffect, useState } from "react";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginModal from "../modal/LoginModal";
import { useHistory } from "react-router";

import { API, setAuthToken } from "../../config/api";
import { AppContext } from "../../context/AppContext";
import Logo from "../atom/Logo";

const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  //   console.log("ini State di Context ", state);

  return (
    <div className="px-5">
      <Navbar collapseOnSelect>
        <Navbar.Brand href="#">
          {/* <img
              src={Logo}
              alt="..."
              width="70px"
              onClick={() => history.push("/")}
            /> */}
          <Logo onClick={() => history.push("/")} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

          <AfterLogin state={state} dispatch={dispatch} />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const AfterLogin = ({ state, dispatch }) => {
  const history = useHistory();
  const [photo, setPhoto] = useState("");
  const path = "http://localhost:4000/uploads/picture/";

  const handleSignout = (e) => {
    dispatch({
      type: "LOGOUT",
    });

    setAuthToken();

    history.push("/");
    dispatch({
      type: "UPDATE",
    });
  };

  const fetchPhoto = async () => {
    try {
      const res = await API.get("/profile");
      // console.log(res);
      setPhoto(
        res.data.data.picture !== null ? path + res.data.data.picture : null
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [photo]);

  return (
    <>
      <Nav>
        <Dropdown as={Nav.Item} id="nav-dropdown">
          <Dropdown.Toggle id="dropdown-autoclose-true" as={Nav.Link}>
            {/* <img
              className="avatar"
              src={photo ? photo : AvatarPlaceholder}
              alt="..."
            /> */}
            DD
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu">
            <NavDropdown.Item onClick={() => history.push("/profile")}>
              <div className="d-flex">
                {/* <img
                  src={ProfileIcon}
                  alt="..."
                  style={{
                    width: "23px",
                    height: "auto",
                    marginRight: "1em",
                  }}
                /> */}
                Profile
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push("/newjourney")}>
              <div className="d-flex">
                {/* <img
                  src={newjourneyIcon}
                  alt="..."
                  style={{
                    width: "23px",
                    height: "auto",
                    marginRight: "1em",
                  }}
                /> */}
                New Journey
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push("/bookmark")}>
              <div className="d-flex">
                {/* <img
                  src={ProfileIcon}
                  alt="..."
                  style={{
                    width: "23px",
                    height: "auto",
                    marginRight: "1em",
                  }}
                /> */}
                Bookmark
              </div>
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item onClick={handleSignout} eventKey="4.4">
              <div className="d-flex">
                {/* <img
                  src={LogoutIcon}
                  alt="..."
                  style={{
                    width: "20px",
                    height: "auto",
                    marginRight: "1em",
                  }}
                /> */}
                Logout
              </div>
            </NavDropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </>
  );
};

export default Header;
