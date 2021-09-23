import { useEffect, useState } from "react";
import { API } from "../../config/api";

export const Checkbox = ({ id, state, dispatch }) => {
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(data);

  const toggle = () => setUpdate(!update);

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
    } else {
      getBookmarkByPost();
    }
  }, [update]);

  const checkboxHandler = () => {
    status ? deleteBookmark() : addToBookmark();
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <input
        type="checkbox"
        name="check"
        id="check"
        checked={status}
        onChange={checkboxHandler}
      />
    </div>
  );
};
