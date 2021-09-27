import React, { useContext, useEffect, useState } from "react";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginModal from "../modal/LoginModal";
import { useHistory } from "react-router";

import { API, setAuthToken } from "../../config/api";
import { AppContext } from "../../context/AppContext";
import Logo from "../atom/Logo";
import BookmarkIcon from "../../assets/Bookmark.svg";
import NewPostIcon from "../../assets/newPost.svg";
import ProfileIcon from "../../assets/profile.svg";
import LogoutIcon from "../../assets/logout 1.svg";
import AvatarPlaceholder from "../../assets/profile.png";

const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  // console.log("ini State di Context ", state);

  return (
    <div className="px-5 shadow">
      <Navbar collapseOnSelect>
        <Navbar.Brand href="#">
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
  const path = "http://localhost:4000/uploads/";

  const handleSignout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
    dispatch({
      type: "CLEAR_BOOKMARK",
    });
    setAuthToken();

    history.push("/");
  };

  const fetchPhoto = async () => {
    try {
      const res = await API.get("/profile");
      setPhoto(res.data.data.picture);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [state.update]);

  return (
    <>
      <Nav>
        <Dropdown as={Nav.Item} id="nav-dropdown">
          <Dropdown.Toggle id="dropdown-autoclose-true" as={Nav.Link}>
            <img
              className="avatar"
              src={photo ? path + photo : AvatarPlaceholder}
              alt="..."
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu">
            <NavDropdown.Item onClick={() => history.push("/profile")}>
              <div className="d-flex mb-1">
                <img
                  src={ProfileIcon}
                  alt="..."
                  style={{
                    width: "23px",
                    height: "auto",
                    marginRight: "1em",
                  }}
                />
                Profile
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push("/newjourney")}>
              <div className="d-flex mb-1">
                <img
                  src={NewPostIcon}
                  alt="..."
                  style={{
                    width: "23px",
                    height: "auto",
                    marginRight: "1em",
                  }}
                />
                New Journey
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push("/bookmark")}>
              <div className="d-flex ms-1 ">
                <img
                  src={BookmarkIcon}
                  alt="..."
                  style={{
                    width: "15px",
                    height: "auto",
                    marginRight: "1.3em",
                  }}
                />
                Bookmark
              </div>
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item onClick={handleSignout} eventKey="4.4">
              <div className="d-flex ms-1">
                <img
                  src={LogoutIcon}
                  alt="..."
                  style={{
                    width: "20px",
                    height: "auto",
                    marginRight: "1em",
                  }}
                />
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
