import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  cart: [],
  user: null,
  token: localStorage.getItem("token"),
  update: false,
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "REGISTER":
      return {
        ...state,
        isLogin: false,
        user: action.payload,
      };
    case "LOGOUT":
    case "AUTH_ERROR":
      localStorage.removeItem("token");

      return {
        ...state,
        isLogin: false,
        user: null,
      };

    case "UPDATE":
      return {
        ...state,
        update: !state.update,
      };

    default:
      throw new Error("unknown cases");
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
