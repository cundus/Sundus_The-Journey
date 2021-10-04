import { useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { API } from "../../config/api";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";

import Atlas from "../../assets/atlas 1.svg";
import Leaf from "../../assets/leaf 1.svg";
import { Textarea } from "@chakra-ui/textarea";
import ErrorMessage from "../atom/ErrorMessage";

const RegisterModal = (props) => {
  const { dispatch, isOpen, onClose, login } = props;
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const doneRef = useRef(null);
  const executeScroll = () => doneRef.current.scrollIntoView();

  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageOk, setMessageOk] = useState("");

  const handleChange = (e) => {
    setIsError(false);
    setMessageOk("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    executeScroll();

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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent h={500}>
          <ModalHeader className="login-modal">
            <img src={Atlas} alt="" className="atlas-img" />
            <img src={Leaf} alt="" className="leaf-img" />
          </ModalHeader>
          <ModalBody>
            <form className="px-2" onSubmit={handleSubmit}>
              <div ref={doneRef}>
                <Text
                  textAlign="center"
                  mb={10}
                  fontSize={26}
                  fontWeight="bold"
                >
                  Register
                </Text>
                {isError && <ErrorMessage status="error" message={message} />}
                {messageOk && (
                  <ErrorMessage status="success" message={messageOk} />
                )}
              </div>

              <FormControl id="fullname" isRequired my={5}>
                <FormLabel fontWeight="bold">Full Name</FormLabel>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="fullName"
                  required
                  variant="filled"
                  value={data.fullName}
                />
              </FormControl>
              <FormControl id="email" isRequired my={5}>
                <FormLabel fontWeight="bold">Email</FormLabel>
                <Input
                  type="email"
                  variant="filled"
                  onChange={handleChange}
                  required
                  value={data.email}
                  name="email"
                />
              </FormControl>
              <FormControl id="password" my={5} isRequired>
                <FormLabel fontWeight="bold">Password</FormLabel>
                <Input
                  type="password"
                  variant="filled"
                  required
                  value={data.password}
                  name="password"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="phone" isRequired my={5}>
                <FormLabel fontWeight="bold">Phone</FormLabel>
                <Input
                  value={data.phone}
                  onChange={handleChange}
                  name="phone"
                  required
                  variant="filled"
                />
              </FormControl>
              <FormControl id="address" isRequired my={5}>
                <FormLabel fontWeight="bold">Address</FormLabel>
                <Textarea
                  onChange={handleChange}
                  value={data.address}
                  name="address"
                  required
                  variant="filled"
                />
              </FormControl>
              <Button
                colorScheme="blue"
                mx="auto"
                w="100%"
                type="submit"
                my={5}
              >
                Login
              </Button>
            </form>

            <Text color="gray.500" textAlign="center" mb={5}>
              Don't have an account? Klik <b onClick={login}>Here</b>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RegisterModal;
