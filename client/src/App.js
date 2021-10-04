//import Lib
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";

// import assets & css
import "./App.css";

// import component
import Home from "./pages/Home";
import DetailPost from "./pages/DetailPost";
import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/api";
import Profile from "./pages/Profile";
import NewPost from "./pages/NewPost";
import Bookmark from "./pages/Bookmark";
import PrivateRoute from "./components/route/PrivateRoute";

function App({ component }) {
  const { state, dispatch } = useContext(AppContext);
  console.log("ini state context", state);
  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      setAuthToken(token);

      const getProfile = await API.get("/profile");
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { ...getProfile.data.data },
      });

      const getBookmarks = await API.get("/profile/bookmarks");
      dispatch({
        type: "GET_BOOKMARK",
        payload: getBookmarks.data.data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "AUTH_ERROR" });
    }
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#E5E5E5";
    checkUser();
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/bookmark" component={Bookmark} />
          <PrivateRoute exact path="/newjourney" component={NewPost} />
          <PrivateRoute exact path="/post/:id" component={DetailPost} />
          <PrivateRoute exact path="/edit/:id" component={NewPost} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
