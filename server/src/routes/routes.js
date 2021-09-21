const route = require("express").Router();

const { login, register } = require("../controller/auth");

// Auth and User
route.post("/login", login);
route.post("/register", register);

module.exports = route;
