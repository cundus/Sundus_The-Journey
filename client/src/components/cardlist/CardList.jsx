import { Image } from "@chakra-ui/image";
import { Box, Heading, Stack, Text, Circle, HStack } from "@chakra-ui/layout";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { AppContext } from "../../context/AppContext";
import LoginModal from "../modal/LoginModal";
import moment from "moment";
import Icon from "@chakra-ui/icon";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { Button } from "@chakra-ui/button";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TiInfoLarge } from "react-icons/ti";
import { useDisclosure } from "@chakra-ui/hooks";
import ConfirmationModal from "../modal/ConfirmationModal";
import { useToast } from "@chakra-ui/toast";
import draftToHtml from "draftjs-to-html";

const CardList = ({ item, isBookmark, isOwner }) => {
  // console.log(item);
  const { state, dispatch } = useContext(AppContext);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const toast = useToast();
  const history = useHistory();
  const path = "http://localhost:4000/uploads/";
  const created = moment(item.createdAt).format("D MMMM YYYY");
  // console.log(created);

  const id = item.id;
  let desc = draftToHtml(JSON.parse(item.description));
  desc = desc.replace(/(<([^>]+)>)/gi, "").substring(0, 230) + "...";

  const title = item.title;

  // function createMarkup(e) {
  //   return { __html: e };
  // }

  const addToBookmark = async () => {
    try {
      const response = await API.post(`/bookmark/${id}`);
      toast({
        title: `Added To Bookmark`,
        status: "success",
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
      dispatch({
        type: "ADD_BOOKMARK",
        payload: id,
      });
      dispatch({
        type: "UPDATE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBookmark = async () => {
    try {
      const response = await API.delete(`/bookmark/${id}`);
      toast({
        title: `Deleted From Bookmark`,
        status: "info",
        position: "top",
        isClosable: true,
        variant: "left-accent",
      });
      console.log("deleted");
      dispatch({
        type: "DELETE_BOOKMARK",
        payload: id,
      });
      dispatch({
        type: "UPDATE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkboxHandler = (e) => {
    e.preventDefault();
    if (state.isLogin === true) {
      isBookmark ? deleteBookmark() : addToBookmark();
    } else {
      onLoginOpen();
    }
  };

  const handleDetail = (e) => {
    e.preventDefault();
    if (!isOwner) {
      if (state.isLogin) {
        history.push(`post/${item.id}`);
      } else {
        onLoginOpen();
      }
    } else {
      return;
    }
  };

  const editPost = (e) => {
    e.preventDefault();
    history.push(`/edit/${item.id}`);
  };

  return (
    <Box position="relative" key={item.id}>
      {isOwner ? null : (
        <label className="label-bookmark">
          <Circle size="26px" bg="white">
            <Icon
              as={isBookmark ? IoBookmark : IoBookmarkOutline}
              color="messenger.300"
              w={5}
              h={5}
            />
          </Circle>
          <input
            type="checkbox"
            name="check"
            id="check"
            checked={isBookmark}
            onChange={(e) => checkboxHandler(e)}
          />
        </label>
      )}

      <Box
        maxW="19rem"
        bg="white"
        h="22.5rem"
        key={item.id}
        shadow="2xl"
        className="card-list"
        onClick={handleDetail}
      >
        <Box>
          <Image
            src={path + item.picture}
            w="100%"
            h="10rem"
            alt={item.title}
            objectFit="cover"
            borderRadius={7}
          />
          {isOwner ? (
            <div className="overlay">
              <Box className="text">
                <HStack spacing={10} className="text">
                  <Button
                    onClick={() => history.push(`post/${item.id}`)}
                    color="white"
                    bg="twitter.400"
                    variant="filled"
                  >
                    <Icon as={TiInfoLarge} w={6} h={6} />
                  </Button>
                  <Button
                    onClick={editPost}
                    color="white"
                    bg="twitter.400"
                    variant="filled"
                  >
                    <Icon as={AiFillEdit} />
                  </Button>
                  <Button
                    onClick={onDeleteOpen}
                    color="white"
                    bg="red.400"
                    variant="filled"
                  >
                    <Icon as={AiFillDelete} />
                  </Button>
                </HStack>
              </Box>
            </div>
          ) : null}
          <Stack p={4} spacing={false}>
            <Heading as="h3" size="sm" isTruncated>
              {title}
            </Heading>
            <Text fontSize="xs" color="gray.400" mt={1} isTruncated>
              {created}, {item.User.fullName}
            </Text>
            <Text fontSize="sm" color="#6C6C6C" mt={2} noOfLines={[6]}>
              {desc}
            </Text>
          </Stack>
        </Box>
      </Box>
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        id={id}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        dispatch={dispatch}
      />
    </Box>
  );
};

export default CardList;
