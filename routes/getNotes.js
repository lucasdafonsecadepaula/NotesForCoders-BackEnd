const express = require("express");
const { getPosts } = require("../controllers/getPosts.js");
const routerWithOutMiddleware = express.Router();

routerWithOutMiddleware.get("/", getPosts);

module.exports = routerWithOutMiddleware;