// import { data, topping } from "../../data/fakedata";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { useContext } from "react";
import { API } from "../config/api";
import { AppContext } from "../context/AppContext";
import Header from "../components/navbar/Header";

const DetailPost = () => {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const path = "http://localhost:4000/uploads/";

  //   console.log(data);

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
      <div className="container">
        <div className="">
          <div className="d-flex justify-content-between">
            <p>{data.title}</p>
            <p>{data.User?.fullName}</p>
          </div>
          {data.createdAt}
        </div>
        <div className="image-detail">
          <img src={path + data.picture} alt="..." />
        </div>
        <p>{data.description}</p>
      </div>
    </>
  );
};

export default DetailPost;
