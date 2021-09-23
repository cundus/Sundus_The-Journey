import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { API } from "../../config/api";

const RegisterModal = ({ show, hide, showLogin }) => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  // console.log(data);

  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageOk, setMessageOk] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ ...data });
      const res = await API.post("/register", body, config);

      console.log(res);
      setData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
      setMessageOk("Success Create Account, You Can Login Now");
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
          <h1 className="color-dominant mb-3">Register</h1>
          {isError && <Alert variant="danger">{message}</Alert>}
          {messageOk && <Alert variant="success">{messageOk}</Alert>}

          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Control
              type="text"
              placeholder="Full Name"
              className="form-dominant"
              onChange={handleChange}
              name="fullName"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="form-dominant"
              required
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-dominant"
              onChange={handleChange}
              name="password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Control
              type="text"
              placeholder="Phone"
              className="form-dominant"
              onChange={handleChange}
              name="phone"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Control
              as="textarea"
              placeholder="Address"
              className="form-dominant"
              onChange={handleChange}
              name="address"
              required
            />
          </Form.Group>

          <Button className="button-dominant full-width" type="submit">
            Register
          </Button>
          <p className="text-center mt-3">
            Already have an account ? Click{" "}
            <span className="fw-bold cursor-pointer" onClick={showLogin}>
              Here
            </span>
          </p>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterModal;
