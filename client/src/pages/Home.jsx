import React, { useContext, useEffect, useState } from "react";
import { Jumbotron } from "../components/jumbotron/Jumbotron";
import { AppContext } from "../context/AppContext";
import { API } from "../config/api";
import CardList from "../components/cardlist/CardList";
import Header from "../components/navbar/Header";
import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import Fade from "react-reveal/Fade";
import PacmanLoader from "react-spinners";
import { Spinner } from "@chakra-ui/spinner";

function Home() {
  const { state } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  // Animations
  const FadeIn = styled.div`
    animation: 2s ${keyframes`${fadeIn}`};
  `;

  // async state
  const [data, setData] = useState([]);

  // Filter
  const [searchParam] = useState(["title", "description"]);
  const [q, setQ] = useState("");

  const getPost = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/posts");
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error, Cannnot get Data!");
    }
  };

  useEffect(() => {
    getPost();
  }, [state.update]);

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  // if (isLoading) return <Spinner />;

  return (
    <div>
      {!state.isLogin ? (
        <Fade>
          <Jumbotron />
        </Fade>
      ) : (
        <Header />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <Box className="" mt={16} px={16}>
          <Heading as="h1" size="xl" isTruncated>
            Journey
          </Heading>

          <Box
            className="search-box"
            display="flex"
            maxW="5xl"
            m="auto"
            mb={10}
            mt={6}
          >
            <Input
              type="text"
              placeholder="Find journey"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              variant="filled"
              style={{ borderRadius: "7px 0 0 7px" }}
            />

            <Button
              variant="solid"
              colorScheme="twitter"
              w="40"
              style={{ borderRadius: "0 7px  7px 0" }}
            >
              Search
            </Button>
          </Box>

          <Center mt={20}>
            <SimpleGrid
              // minChildWidth="9rem"
              columns={[1, 2, 4]}
              spacingX="40px"
              spacingY="40px"
            >
              {search(data).map((item) => {
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
                  <CardList
                    item={item}
                    isBookmark={isBookmark}
                    isOwner={false}
                  />
                );
              })}
            </SimpleGrid>
          </Center>
        </Box>
      )}
    </div>
  );
}

export default Home;
