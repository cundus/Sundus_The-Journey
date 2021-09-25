import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  bookmarks: [],
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
    case "GET_BOOKMARK":
      const bookmark = action.payload;
      const postId = bookmark.map((item) => item.Journey.id);
      return {
        ...state,
        bookmarks: postId,
      };
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "DELETE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((item) => item !== action.payload),
      };
    case "CLEAR_BOOKMARK":
      return {
        ...state,
        bookmarks: [],
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
