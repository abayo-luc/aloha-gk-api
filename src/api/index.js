const routers = require("express").Router();
import MainController from "./MainController";

routers.use("/v1/products", require("./v1/products/router"));
routers.get("/", MainController.home);

export default routers;
