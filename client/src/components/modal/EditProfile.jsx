import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import ErrorMessage from "../atom/ErrorMessage";

import PhotoPlaceholder from "../../assets/profile.png";
import Atlas from "../../assets/atlas 1.svg";
import Leaf from "../../assets/leaf 1.svg";
import { Textarea } from "@chakra-ui/textarea";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Center, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";

const EditProfile = ({ isOpen, onClose, profile }) => {
  const [data, setData] = useState({
    fullName: profile?.fullName,
    email: profile?.email,
    password: profile?.password,
    phone: profile?.phone,
    address: profile?.address,
  });
  // console.log(data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const path = "http://localhost:4000/uploads/";

  const profilePic = profile.picture
    ? path + profile.picture
    : PhotoPlaceholder;

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
          <ModalHeader
            textAlign="center"
            my={5}
            fontSize={26}
            className="login-modal"
          >
            <img src={Atlas} alt="" className="atlas-img" />
            <img src={Leaf} alt="" className="leaf-img" />
            Edit Profile
          </ModalHeader>
          <ModalBody>
            <form className="px-2">
              {/* {isError && <ErrorMessage status="error" message={message} />}
              {messageOk && (
                <ErrorMessage status="success" message={messageOk} />
              )} */}
              <Center>
                <Image
                  borderRadius="full"
                  boxSize="170px"
                  objectFit="cover"
                  src={profilePic}
                  alt={profile.fullName}
                />
              </Center>

              <FormControl id="fullname" isRequired my={5}>
                <FormLabel fontWeight="bold">Full Name</FormLabel>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="fullName"
                  required
                  value={data.fullName}
                  variant="filled"
                />
              </FormControl>
              <FormControl id="email" isRequired my={5}>
                <FormLabel fontWeight="bold">Email</FormLabel>
                <Input
                  type="email"
                  variant="filled"
                  onChange={handleChange}
                  required
                  name="email"
                  disabled
                  value={data.email}
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
                  value={data.password}
                />
              </FormControl>
              <FormControl id="phone" isRequired my={5}>
                <FormLabel fontWeight="bold">Phone</FormLabel>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="phone"
                  required
                  variant="filled"
                  value={data.phone}
                />
              </FormControl>
              <FormControl id="address" isRequired my={5}>
                <FormLabel fontWeight="bold">Address</FormLabel>
                <Textarea
                  onChange={handleChange}
                  name="address"
                  required
                  variant="filled"
                  value={data.address}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProfile;
