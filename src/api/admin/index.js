const adminRouters = require("express").Router();
import userCrud from "./users";
import productCrud from "./products";
import categoryCrud from "./category";
import reviewCrud from "./reviews";

adminRouters.use("/admin", [userCrud, productCrud, categoryCrud, reviewCrud]);

export default adminRouters;
