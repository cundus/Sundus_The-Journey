import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../config/api";
import ErrorMessage from "../atom/ErrorMessage";

import Atlas from "../../assets/atlas 1.svg";
import Leaf from "../../assets/leaf 1.svg";

const LoginModal = (props) => {
  const { dispatch, isOpen, onClose, register } = props;
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setIsError(false);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        "Content-Type": "application/json",
      };
      const res = await API.post("/login", data, config);
      setAuthToken(res.data.data.token);
      localStorage.setItem("token", res.data.data.token);

      const getProfile = await API.get("/profile");
      dispatch({
        type: "LOGIN",
        payload: { ...getProfile.data.data },
      });
      const getBookmarks = await API.get("/profile/bookmarks");
      dispatch({
        type: "GET_BOOKMARK",
        payload: getBookmarks.data.data,
      });
      dispatch({
        type: "UPDATE",
      });
      onClose();
      history.push("/");
    } catch (error) {
      const { response } = error;
      console.log({ error });
      setMessage(response.data.message);
      setIsError(true);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            my={5}
            fontSize={24}
            className="login-modal"
          >
            <img src={Atlas} alt="" className="atlas-img" />
            <img src={Leaf} alt="" className="leaf-img" />
            Login
          </ModalHeader>
          <form className="px-4" onSubmit={handleSubmit}>
            {isError && <ErrorMessage status="error" message={message} />}
            <FormControl id="email" isRequired>
              <FormLabel fontWeight="bold">Email</FormLabel>
              <Input
                type="email"
                variant="filled"
                onChange={handleChange}
                required
                name="email"
              />
            </FormControl>

            <FormControl id="password" my={5} isRequired>
              <FormLabel fontWeight="bold">Password</FormLabel>
              <Input
                type="password"
                variant="filled"
                required
                name="password"
                onChange={handleChange}
              />
            </FormControl>

            <Button colorScheme="blue" mx="auto" w="100%" type="submit" my={5}>
              Login
            </Button>
          </form>

          <Text color="gray.500" textAlign="center" mb={5}>
            Don't have an account? Klik <b onClick={register}>Here</b>
          </Text>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;
