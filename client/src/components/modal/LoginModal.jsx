import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../config/api";

// import { loginData } from "../../data/fakedata";

const LoginModal = ({ show, hide, showRegister, dispatch }) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      const config = {
        "Content-Type": "application/json",
      };
      const res = await API.post("/login", data, config);
      // console.log("data Login", res.data.data);

      setAuthToken(res.data.data.token);
      localStorage.setItem("token", res.data.data.token);

      const getProfile = await API.get("/profile");

      dispatch({
        type: "LOGIN",
        payload: { ...getProfile.data.data },
      });
      localStorage.setItem("token", res.data.data.token);
      hide();
      history.push("/");
    } catch (error) {
      const { response } = error;
      console.log(response);
      setIsError(true);
      setMessage(response.data.message);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={hide} centered>
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1 className="color-dominant mb-3">Login</h1>
          {isError && <Alert variant="danger">{message}</Alert>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="form-dominant"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-dominant"
              required
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="button-dominant full-width" type="submit">
            Login
          </Button>
          <p className="text-center mt-3">
            Don't have an account ? Click{" "}
            <span className="fw-bold cursor-pointer" onClick={showRegister}>
              Here
            </span>
          </p>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
