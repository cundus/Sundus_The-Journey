import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

/**
 * Wrapper component to protect particular route
 * we use conditional rendering base on state to check
 * if there is user login or not
 * if login: render Component
 * if not: redirect to home path
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          state.isLogin ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
};

export default PrivateRoute;
