const adminRouters = require("express").Router();
import userCrud from "./users";
import productCrud from "./products";
import categoryCrud from "./category";
import reviewCrud from "./reviews";
import imageCrud from "./image";

adminRouters.use("/admin", [
  userCrud,
  productCrud,
  categoryCrud,
  reviewCrud,
  imageCrud,
]);

export default adminRouters;
