import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import CardList from "../components/cardlist/CardList";
import Header from "../components/navbar/Header";
import { API } from "../config/api";
import { AppContext } from "../context/AppContext";

const Bookmark = () => {
  const { state } = useContext(AppContext);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const path = "http://localhost:4000/uploads/";
  const history = useHistory();
  const getData = async () => {
    try {
      setLoading(true);
      const resPost = await API.get("/profile/bookmarks");
      console.log(resPost);
      setPost(resPost?.data.data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getData();
  }, [state.update]);

  if (loading) return <p>loading</p>;

  return (
    <div>
      <Header />
      <Container maxW="container.xl" mt={16}>
        <Heading as="h1" size="xl" isTruncated>
          Bookmark
        </Heading>

        <Center mt={20}>
          {post.length > 0 ? (
            <SimpleGrid
              // minChildWidth="9rem"
              columns={[1, 2, 4]}
              spacingX="40px"
              spacingY="40px"
            >
              {post.map((item) => {
                let isBookmark = false;
                state.bookmarks.length > 0
                  ? state.bookmarks.map((id) => {
                      if (item.Journey.id !== id) {
                        return isBookmark;
                      } else if (item.Journey.id === id) {
                        isBookmark = true;
                      }
                    })
                  : (isBookmark = false);
                return (
                  <CardList
                    item={item.Journey}
                    isBookmark={isBookmark}
                    isOwner={false}
                  />
                );
              })}
            </SimpleGrid>
          ) : (
            <Box display="block" w="100%">
              <Text fontSize="xl" textAlign="center">
                Looks like you haven't made any Journeys yet, want to make one
                now?
              </Text>
              <Text
                fontSize="xl"
                textAlign="center"
                color="twitter.400"
                onClick={() => history.push("/")}
                _hover={{ cursor: "pointer" }}
              >
                Let's Go!
              </Text>
            </Box>
          )}
        </Center>
      </Container>
    </div>
  );
};

export default Bookmark;
