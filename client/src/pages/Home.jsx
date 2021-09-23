import React, { useContext, useEffect, useState } from "react";
import { Jumbotron } from "../components/jumbotron/Jumbotron";
import { AppContext } from "../context/AppContext";
import { API } from "../config/api";
import CardList from "../components/cardlist/CardList";
import { Col, Row } from "react-bootstrap";
import Header from "../components/navbar/Header";

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
  }, []);

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

      <div className="px-5">
        <p className="fs-1">Journey</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Find journey"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button>search</button>
        </div>

        <Row>
          {search(data).map((item) => (
            <Col sm={3} key={item.id}>
              <CardList item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
