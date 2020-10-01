const protectedRoutes = require("express").Router();
const allRouters = require("express").Router();
import userCrud from "./users";
import productCrud from "./products";
import categoryCrud from "./category";
import reviewCrud from "./reviews";
import imageCrud from "./image";
import orderCrud from "./order";
import productCategories from "./ProductCategory";
import auth from "./auth.routes";
import { isAuthenticated } from "../../middlewares/request";

protectedRoutes.use("/admin", isAuthenticated, [
  userCrud,
  productCrud,
  categoryCrud,
  reviewCrud,
  imageCrud,
  orderCrud,
  productCategories,
]);

allRouters.use([auth, protectedRoutes]);

export default allRouters;
