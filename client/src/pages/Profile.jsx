import React, { useEffect, useState } from "react";
import { API } from "../config/api";
import PhotoPlaceholder from "../assets/profile.png";
import Header from "../components/navbar/Header";
import CardList from "../components/cardlist/CardList";
import { Col, Row } from "react-bootstrap";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const path = "http://localhost:4000/uploads/";

  const getData = async () => {
    try {
      setLoading(true);
      const resProfile = await API.get("/profile");
      const resPost = await API.get("/profile/posts");

      console.log("get Product", resPost, resProfile);
      setProfile(resProfile.data.data);
      setPost(resPost.data.data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="mt-5">
        <div className="" style={{ textAlign: "center" }}>
          <img
            src={profile?.picture ? path + profile.picture : PhotoPlaceholder}
            alt=""
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
            className="img-thumbnail rounded-circle mx-auto"
          />
          <p>{profile.fullName}</p>
          <p>{profile.email}</p>
        </div>
        <div>
          <Row>
            {post?.map((item) => (
              <Col>
                <CardList item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Profile;
