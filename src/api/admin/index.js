const adminRouters = require("express").Router();
import userCrud from "./users";
import productCrud from "./products";
import categoryCrud from "./category";
import reviewCrud from "./reviews";
import imageCrud from "./image";
import orderCrud from "./order";

adminRouters.use("/admin", [
  userCrud,
  productCrud,
  categoryCrud,
  reviewCrud,
  imageCrud,
  orderCrud,
]);

export default adminRouters;
