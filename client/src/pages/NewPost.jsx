import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Header from "../components/navbar/Header";
import { API } from "../config/api";

import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";

const NewPost = () => {
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { id } = useParams();
  const path = "http://localhost:4000/uploads/";
  // console.log(title);

  // const handleSubmitEdit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const rawContentState = convertToRaw(
  //       editData?.description.getCurrentContent()
  //     );

  //     const data = new FormData();
  //     data.append("title", title);
  //     data.append("description", JSON.stringify(rawContentState));
  //     if (photo !== null) {
  //       data.append("picture", photo);
  //     }

  //     const config = {
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //       },
  //     };
  //     await API.patch(`/post/${id}`, data, config);
  //     history.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const rawContentState = convertToRaw(description.getCurrentContent());

      const data = new FormData();
      data.append("title", title);
      data.append("description", JSON.stringify(rawContentState));

      if (preview !== null) {
        data.append("picture", preview);
      }
      console.log(isEdit);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      if (isEdit === true) {
        await API.patch(`/post/${id}`, data, config);
      } else {
        await API.post("/post", data, config);
      }
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailPost = async () => {
    try {
      setLoading(true);
      const post = await API.get(`/post/${id}`);
      // console.log(post.data.data);
      const postData = post.data.data;

      const descriptionOld = convertFromRaw(JSON.parse(postData.description));
      setTitle(postData.title);
      setDescription(EditorState.createWithContent(descriptionOld));
      setPhoto(postData.picture);

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error, cannot get data!");
    }
  };

  useEffect(() => {
    const pathUrl = window.location.pathname;
    if (pathUrl === "/newjourney") {
      setIsEdit(false);
    } else {
      setIsEdit(true);
      getDetailPost();
    }
  }, []);

  return (
    <>
      <Header />
      <Box px={30} mt={16}>
        <Heading as="h1" size="xl" isTruncated>
          New Journey
        </Heading>
        <Box px={50} py={30} f>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="first-name" isRequired>
                <FormLabel fontWeight="bold">Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  color="white"
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    boxShadow: "none",
                    border: "1px solid grey",
                    backgroundColor: "white",
                    color: "black",
                  }}
                  value={title}
                  required
                />
              </FormControl>

              <Editor
                editorState={description}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                wrapperStyle={{
                  outline: "1px solid gray",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
                editorStyle={{ height: "300px", padding: "0 10px" }}
                onEditorStateChange={(editorState) =>
                  setDescription(editorState)
                }
              />
              <Box>
                <FormControl id="upload" w="fit-content">
                  <FormLabel
                    border="gray 1px solid"
                    bg="white"
                    px={5}
                    py={2}
                    borderRadius={5}
                    _hover={{
                      cursor: "pointer",
                      backgroundColor: "gray",
                    }}
                  >
                    <AttachmentIcon color="gray.600" me="5" />
                    {photo || preview ? "Change Image" : "Add Image"}
                  </FormLabel>
                  <Input
                    type="file"
                    placeholder="Phone number"
                    hidden
                    name="photo"
                    onChange={(e) => {
                      setPreview(e.target.files[0]);
                    }}
                  />
                </FormControl>
                {photo || preview ? (
                  <Image
                    src={preview ? URL.createObjectURL(preview) : path + photo}
                    w="xl"
                    mx="auto"
                  />
                ) : null}
              </Box>
              <Flex justify="end">
                <Button
                  variant="solid"
                  colorScheme="twitter"
                  type="submit"
                  px={10}
                >
                  Post
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default NewPost;
