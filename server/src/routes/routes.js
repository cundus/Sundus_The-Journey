const route = require("express").Router();

const { auth } = require("../middleware/auth");
const { uploadFile } = require("../middleware/uploadFiles");
const { login, register } = require("../controller/auth");
const {
  getUsers,
  getUser,
  getLoggedinUser,
  updateUser,
} = require("../controller/user");
const {
  addPost,
  getPosts,
  getPost,
  getPostByUser,
  updatePost,
  deletePost,
  getPostByUserLogin,
} = require("../controller/post");
const {
  addBookmark,
  getBookmarkByPostId,
  getBookmarks,
  getBookmarkByUserId,
  deleteBookmark,
  checkBookmarkedPost,
} = require("../controller/bookmark");

// Auth and Users
route.post("/login", login);
route.post("/register", register);
route.get("/users", getUsers);
route.get("/user/:id", getUser);
route.get("/profile", auth, getLoggedinUser);
route.patch("/profile", auth, uploadFile("picture"), updateUser);

// Posts
route.post("/post", auth, uploadFile("picture"), addPost);
route.get("/posts", getPosts);
route.get("/post/:id", getPost);
route.get("/profile/posts", auth, getPostByUserLogin);
route.get("/posts/:userid", getPostByUser);
route.patch("/post/:id", auth, uploadFile("picture"), updatePost);
route.delete("/post/:id", auth, deletePost);

// Bookmark
route.post("/bookmark/:postId", auth, addBookmark);
route.get("/bookmark/:id", auth, checkBookmarkedPost);
route.get("/bookmarks", getBookmarks);
route.get("/profile/bookmarks", auth, getBookmarkByUserId);
route.delete("/bookmark/:id", auth, deleteBookmark);

module.exports = route;
