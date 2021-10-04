import React, { useContext, useEffect, useState } from "react";
import { Jumbotron } from "../components/jumbotron/Jumbotron";
import { AppContext } from "../context/AppContext";
import { API } from "../config/api";
import CardList from "../components/cardlist/CardList";
import Header from "../components/navbar/Header";
import { Box, Center, Flex, Heading, SimpleGrid } from "@chakra-ui/layout";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import Fade from "react-reveal/Fade";
import { Spinner } from "@chakra-ui/spinner";
import { CircularProgress } from "@chakra-ui/progress";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { ScaleFade } from "@chakra-ui/transition";

function Home() {
  const { state } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

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
        <Fade top>
          <Jumbotron />
        </Fade>
      ) : (
        <Header />
      )}
      {isLoading ? (
        <Flex justify="center" mt={30}>
          <CircularProgress
            isIndeterminate
            size="100px"
            color="twitter.400"
            thickness="5px"
          />
        </Flex>
      ) : (
        <Box className="" mt={16} px={16}>
          <Fade>
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
              <InputGroup size="md">
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Find journey"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  variant="filled"
                />
                <ScaleFade initialScale={0.9} in={q.length > 0} reverse>
                  <InputRightElement>
                    <CloseIcon onClick={() => setQ("")} />
                  </InputRightElement>
                </ScaleFade>
              </InputGroup>
            </Box>
          </Fade>

          <Fade bottom>
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
          </Fade>
        </Box>
      )}
    </div>
  );
}

export default Home;
