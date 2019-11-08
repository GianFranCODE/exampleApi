const express = require("express");
const ProductCtrl = require("../controllers/ProductController");

const Router = express.Router();

Router.get("/", ProductCtrl.index)
  .post("/", ProductCtrl.create)
  .get("/:key/:value", ProductCtrl.find, ProductCtrl.show)
  .put("/:key/:value", ProductCtrl.find, ProductCtrl.update)
  .delete("/:key/:value", ProductCtrl.find, ProductCtrl.remove);

module.exports = Router;
