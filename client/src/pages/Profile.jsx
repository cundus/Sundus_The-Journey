import React, { useContext, useEffect, useState } from "react";
import { API } from "../config/api";
import PhotoPlaceholder from "../assets/profile.png";
import Header from "../components/navbar/Header";
import CardList from "../components/cardlist/CardList";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { AppContext } from "../context/AppContext";
import EditProfile from "../components/modal/EditProfile";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { IoCamera } from "react-icons/io5";
import { EditIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

const Profile = () => {
  const { state, dispatch } = useContext(AppContext);
  const [profile, setProfile] = useState({});
  const [name, setName] = useState({});
  const [preview, setPreview] = useState(null);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const path = "http://localhost:4000/uploads/";

  const profilePic = profile.picture
    ? path + profile.picture
    : PhotoPlaceholder;

  const getData = async () => {
    try {
      setLoading(true);
      const resProfile = await API.get("/profile");
      const resPost = await API.get("/profile/posts");

      // console.log("get Product", resPost, resProfile);
      setProfile(resProfile.data.data);
      setPost(resPost.data.data);
      setName({ fullName: resProfile.data.data.fullName });
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (name.fullName === profile.fullName && preview === null) {
        return setIsEdit(false);
      }
      const data = new FormData();
      data.append("fullName", name.fullName);
      if (preview !== null) {
        data.append("picture", preview);
      }

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      await API.patch("/profile", data, config);
      dispatch({
        type: "UPDATE",
      });
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [state.update]);

  return (
    <>
      <Header />
      <Box mt={16} px={16} h="100vh">
        <Heading as="h1" size="xl">
          Profile
        </Heading>

        <Center mt={10}>
          <Stack spacing={false} mb={20}>
            <>
              {isEdit ? (
                <>
                  <Image
                    borderRadius="full"
                    boxSize="170px"
                    objectFit="cover"
                    src={preview ? URL.createObjectURL(preview) : profilePic}
                    alt={profile.fullName}
                    alignSelf="center"
                  />
                  <label htmlFor="upload" className="edit-icon">
                    <Icon as={IoCamera} h={8} w={8} />
                    <input
                      type="file"
                      hidden
                      id="upload"
                      name="photo"
                      onChange={(e) => {
                        setPreview(e.target.files[0]);
                      }}
                    />
                  </label>
                  <form onSubmit={handleSubmit}>
                    <Input
                      textAlign="center"
                      variant="filled"
                      colorScheme="twitter"
                      mt="1em"
                      value={name.fullName}
                      onChange={(e) => setName({ fullName: e.target.value })}
                    />
                    <Text
                      fontSize="sm"
                      color="#6C6C6C"
                      textAlign="center"
                      mt="1em"
                    >
                      {profile.email}
                    </Text>
                    <Center mt="1em">
                      <Button
                        variant="filled"
                        bg="red.400"
                        onClick={() => setIsEdit(false)}
                        me={5}
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="filled"
                        bg="twitter.400"
                        type="submit"
                        size="sm"
                      >
                        Save
                      </Button>
                    </Center>
                  </form>
                </>
              ) : (
                <>
                  <Image
                    borderRadius="full"
                    boxSize="170px"
                    objectFit="cover"
                    src={profilePic}
                    alt={profile.fullName}
                    alignSelf="center"
                  />
                  <EditIcon
                    className="edit-icon"
                    onClick={() => setIsEdit(true)}
                  />
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    textAlign="center"
                    mt={5}
                  >
                    {profile.fullName}
                  </Text>
                  <Text fontSize="sm" color="#6C6C6C" textAlign="center">
                    {profile.email}
                  </Text>
                </>
              )}
            </>
          </Stack>
        </Center>
        <Center mt={20}>
          <SimpleGrid columns={4} spacing={10}>
            {post.map((item) => {
              let isBookmark = false;
              state.bookmarks.length > 0
                ? state.bookmarks.map((id) => {
                    if (item.id !== id) {
                      return isBookmark;
                    } else if (item.id === id) {
                      isBookmark = true;
                    }
                  })
                : (isBookmark = false);
              return (
                <CardList item={item} isBookmark={isBookmark} isOwner={true} />
              );
            })}
          </SimpleGrid>
        </Center>
      </Box>
      <EditProfile isOpen={isOpen} onClose={onClose} profile={profile} />
    </>
  );
};

export default Profile;
