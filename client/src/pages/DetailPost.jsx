// import { data, topping } from "../../data/fakedata";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { useContext } from "react";
import { API } from "../config/api";
import { AppContext } from "../context/AppContext";
import Header from "../components/navbar/Header";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";

const DetailPost = () => {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const path = "http://localhost:4000/uploads/";
  const created = moment(data.createdAt).format("D MMMM YYYY");
  //   console.log(data);

  function createMarkup(e) {
    return { __html: e };
  }

  const getProductAndTopping = async () => {
    try {
      setLoading(true);
      const post = await API.get(`/post/${id}`);

      setData(post.data.data);
      setLoading(false);
      // console.log(product, topping);
    } catch (error) {
      console.log(error);
      alert("Error, cannot get data!");
    }
  };

  useEffect(() => {
    getProductAndTopping();
  }, []);

  if (loading) return <p>Loading....</p>;

  return (
    <>
      <Header />
      <Container maxW="container.xl" mt={16}>
        <Box mb={10}>
          <Flex justify="space-between">
            <Heading as="h1">{data.title}</Heading>
            <Text fontSize="lg">{data.User?.fullName}</Text>
          </Flex>
          <Text color="twitter.600">{created}</Text>
        </Box>
        <Box mb={10}>
          <Img
            src={path + data?.picture}
            alt="..."
            borderRadius={8}
            boxSize="100%"
          />
        </Box>
        <div dangerouslySetInnerHTML={createMarkup(data.description)} />
      </Container>
    </>
  );
};

export default DetailPost;
