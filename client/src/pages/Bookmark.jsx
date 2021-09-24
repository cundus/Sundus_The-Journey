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

  // if (loading) return;

  return (
    <div>
      <Header />
      <div className="mt-2">
        <h1 className="fs-1">Bookmark</h1>
        <div>
          <Row>
            {post.map((item) => (
              <Col key={item.id}>
                <CardList item={item.Journey} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
