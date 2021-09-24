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

// Theming with Chakra

const colors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
  },
};

const theme = extendTheme({ colors });

function App({ component }) {
  const { state, dispatch } = useContext(AppContext);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      setAuthToken(token);
      const getProfile = await API.get("/profile");
      // console.log(getProfile);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { ...getProfile.data.data },
      });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "AUTH_ERROR" });
    }
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#E5E5E5";
    checkUser();
  }, [state.update]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/bookmark" component={Bookmark} />
          <Route exact path="/newjourney" component={NewPost} />
          <Route exact path="/post/:id" component={DetailPost} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
