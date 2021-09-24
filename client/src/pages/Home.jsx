import React, { useContext, useEffect, useState } from "react";
import { Jumbotron } from "../components/jumbotron/Jumbotron";
import { AppContext } from "../context/AppContext";
import { API } from "../config/api";
import CardList from "../components/cardlist/CardList";
import { Col, Row } from "react-bootstrap";
import Header from "../components/navbar/Header";
import { Box } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["title"]);
  const [filter, setFilter] = useState([]);

  const getPost = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/posts");
      // console.log(response);
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

  // useEffect(() => {
  //   getPost();
  // });

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  if (isLoading) return <p>loading</p>;

  return (
    <div>
      {!state.isLogin ? <Jumbotron /> : <Header />}

      <Box className="" mt={10} px={20}>
        <p className="fs-1">Journey</p>

        <Box
          className="search-box"
          display="flex"
          w="5xl"
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

        <Row>
          {search(data).map((item) => (
            <Col sm={3} key={item.id}>
              <CardList item={item} />
            </Col>
          ))}
        </Row>
      </Box>
    </div>
  );
}

export default Home;
