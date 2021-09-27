import { Box, Center, Container, Heading, SimpleGrid } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CardList from "../components/cardlist/CardList";
import Header from "../components/navbar/Header";
import { API } from "../config/api";
import { AppContext } from "../context/AppContext";

const Bookmark = () => {
  const { state } = useContext(AppContext);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const path = "http://localhost:4000/uploads/";

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
        </Center>
      </Container>
    </div>
  );
};

export default Bookmark;
