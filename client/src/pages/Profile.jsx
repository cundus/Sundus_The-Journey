import React, { useEffect, useState } from "react";
import { API } from "../config/api";
import PhotoPlaceholder from "../assets/profile.png";
import Header from "../components/navbar/Header";
import CardList from "../components/cardlist/CardList";
import { Col, Row } from "react-bootstrap";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <Box p={10}>
        <Heading as="h1" size="xl">
          Profile
        </Heading>

        <Center mt={10}>
          <Stack spacing={false}>
            {isEdit ? null : (
              <>
                <Image
                  borderRadius="full"
                  boxSize="170px"
                  objectFit="cover"
                  src={profilePic}
                  alt={profile.fullName}
                  alignSelf="center"
                />
                <Text fontSize="lg" fontWeight="bold" textAlign="center" mt={5}>
                  {profile.fullName}
                </Text>
                <Text fontSize="sm" color="#6C6C6C" textAlign="center">
                  {profile.email}
                </Text>
              </>
            )}
            <Box
              as="button"
              mt={10}
              bg="twitter.400"
              p={2}
              borderRadius={7}
              color="white"
              onClick={() => setIsEdit(!isEdit)}
              w="3xs"
            >
              Edit
            </Box>
          </Stack>
        </Center>
        <Center mt={20}>
          <SimpleGrid columns={4} spacing={10}>
            {post?.map((item) => (
              <CardList item={item} />
            ))}
          </SimpleGrid>
        </Center>
      </Box>
    </>
  );
};

export default Profile;
