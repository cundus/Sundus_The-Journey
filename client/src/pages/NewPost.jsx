import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import Header from "../components/navbar/Header";
import { API } from "../config/api";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const history = useHistory();

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
      <div>
        <h1>New Journey</h1>
        <div className="">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="ControlInput1">
              <Form.Control
                type="text"
                placeholder="Name Product"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                className="form-dominant color-dominant"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="ControlInput3">
              <Form.Control
                required
                as="textarea"
                placeholder="Description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                className="form-dominant color-dominant"
              />
            </Form.Group>

            <div className="form-dominant color-dominant uploadForm mb-5">
              <label
                htmlFor="upload"
                className="d-flex justify-content-between"
              >
                {photo ? photo.name : "Journey Picture"}{" "}
                {/* <img src={UploadIcon} alt="upload" width="15px" /> */}
              </label>
              <input
                required
                type="file"
                hidden
                id="upload"
                name="photo"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                  // setImage(e.target.files[0].name);
                }}
              />
            </div>

            <Button
              variant="primary"
              style={{
                backgroundColor: "blue",
                color: "white",
                paddingInline: "20px",
              }}
              type="submit"
            >
              Post
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NewPost;
