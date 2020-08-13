const routers = require("express").Router();
import MainController from "./MainController";

routers.use("/v1/products", require("./v1/products/router"));
routers.use("/v1/categories", require("./v1/categories/router"));
routers.use("/v1/authentications", require("./v1/auth/router"));
// routers.use("/v1/product/", require("./v1/reviews/router"));
routers.get("/", MainController.home);

export default routers;
