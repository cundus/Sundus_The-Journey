import React, { useState } from "react";
import { useHistory } from "react-router";
import Header from "../components/navbar/Header";
import { API } from "../config/api";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHtml } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { AttachmentIcon } from "@chakra-ui/icons";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const history = useHistory();

  console.log();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("picture", photo);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      await API.post("/post", data, config);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Box px={30} py={30}>
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
                  // variant="filled"
                  color="white"
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    boxShadow: "none",
                    border: "1px solid grey",
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              </FormControl>

              <Flex>
                <FormControl id="upload" w={180}>
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
                    Add Image
                  </FormLabel>
                  <Input
                    type="file"
                    placeholder="Phone number"
                    hidden
                    name="photo"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                  />
                </FormControl>
              </Flex>

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
                editorStyle={{ height: "300px", padding: "10px" }}
                onEditorStateChange={(editorState) =>
                  setDescription(editorState)
                }
              />

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
