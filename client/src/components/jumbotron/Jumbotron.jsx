import React, { useContext } from "react";
import "./Jumbotron.css";
import { Box, Flex } from "@chakra-ui/react";
import Logo from "../atom/Logo";
import { Button } from "react-bootstrap";
import LoginModal from "../modal/LoginModal";

import { AppContext } from "../../context/AppContext";
import RegisterModal from "../modal/RegisterModal";

export const Jumbotron = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);

  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="jumbotron">
      <div className="d-flex justify-content-between px-5 py-3">
        <Logo className="cursor-pointer" />
        <div className="d-flex justify-content-evenly btnContainer">
          <Button onClick={() => setShowLogin(true)}>Login</Button>
          <Button onClick={() => setShowRegister(true)}>Register</Button>
        </div>
      </div>
      <LoginModal
        show={showLogin}
        hide={() => setShowLogin(false)}
        dispatch={dispatch}
      />
      <RegisterModal
        show={showRegister}
        hide={() => setShowRegister(false)}
        dispatch={dispatch}
      />
    </div>
  );
};
