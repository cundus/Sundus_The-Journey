import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { AppContext } from "../../context/AppContext";
import { Checkbox } from "../atom/Checkbox";
import LoginModal from "../modal/LoginModal";

const CardList = ({ item }) => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const path = "http://localhost:4000/uploads/";
  const [showLogin, setShowLogin] = useState(false);

  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => setUpdate(!update);
  const id = item.id;

  const addToBookmark = async () => {
    try {
      setIsLoading(true);

      const response = await API.post(`/bookmark/${id}`);
      toggle();
      console.log("added", response);
      dispatch({
        type: "UPDATE",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBookmark = async () => {
    try {
      setIsLoading(true);

      const response = await API.delete(`/bookmark/${id}`);
      toggle();
      console.log("deleted", response);
      dispatch({
        type: "UPDATE",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookmarkByPost = async () => {
    try {
      setIsLoading(true);

      const response = await API.get(`/bookmark/${id}`);
      if (response.data.data) {
        setStatus(true);
      } else {
        setStatus(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (!state.isLogin) {
      setStatus(false);
    }

    if (state.isLogin) {
      getBookmarkByPost();
    }
  }, [update]);

  const checkboxHandler = () => {
    status ? deleteBookmark() : addToBookmark();
  };

  const handleDetail = () => {
    if (state.isLogin) {
      history.push(`post/${item.id}`);
    } else {
      setShowLogin(true);
    }
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <Card
        className="cursor-pointer mb-5 cardPost"
        style={{
          width: "16rem",
          borderRadius: "10px",
          background: "#F6DADA",
        }}
        key={item.id}
      >
        <input
          type="checkbox"
          name="check"
          id="check"
          checked={status}
          onChange={checkboxHandler}
        />
        <div onClick={handleDetail}>
          <Card.Img
            variant="top"
            src={path + item.picture}
            style={{
              objectFit: "cover",
              width: "16rem",
              height: "20rem",
              borderRadius: "10px",
            }}
          />
          <Card.Body>
            <p className="color-dominant m-0">
              <strong>{item.title}</strong>
            </p>
            <Card.Text style={{ color: "#974A4A" }}>
              {item.description.substring(0, 50)}
            </Card.Text>
          </Card.Body>
        </div>
      </Card>
      <LoginModal
        show={showLogin}
        hide={() => setShowLogin(false)}
        dispatch={dispatch}
      />
    </div>
  );
};

export default CardList;
