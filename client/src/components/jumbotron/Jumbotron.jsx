import React, { useContext } from "react";
import "./Jumbotron.css";
import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import Logo from "../atom/Logo";
import LoginModal from "../modal/LoginModal";

import { AppContext } from "../../context/AppContext";
import RegisterModal from "../modal/RegisterModal";

export const Jumbotron = () => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="jumbotron">
      <Box display="flex" justifyContent="space-between" px={10} py={5}>
        <Logo className="cursor-pointer" />
        <Flex width="60" justifyContent="space-around">
          <Button
            color="gray.50"
            colorScheme="linkedin"
            variant="outline"
            onClick={onLoginOpen}
            px={10}
            size="sm"
            me={3}
          >
            <Text color="white">Login</Text>
          </Button>
          <Button
            variant="solid"
            colorScheme="twitter"
            onClick={onRegisterOpen}
            px={10}
            size="sm"
          >
            Register
          </Button>
        </Flex>
      </Box>
      <Box w="550px" mt={20} ms={10}>
        <Heading as="h1" size="2xl" color="white">
          The Journey
        </Heading>
        <Heading as="h1" size="2xl" color="white">
          you never dreamed of.
        </Heading>
        <Text color="white" mt={5} fontSize="md" noOfColumn={2}>
          We made a tool so you can easily keep &#38; share your travel
          memories. But there is a lot more
        </Text>
      </Box>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        dispatch={dispatch}
        register={() => {
          onLoginClose();
          onRegisterOpen();
        }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={onRegisterClose}
        dispatch={dispatch}
        login={() => {
          onRegisterClose();
          onLoginOpen();
        }}
      />
    </div>
  );
};
