import crud from "express-sequelize-crud";
import { ProductCategory } from "../../models";

export default crud("/productcategories", ProductCategory, {
  create: () => {
    throw new Error("Action not allowed");
  },
  update: () => {
    throw new Error("Action not allowed");
  },
  destroy: () => {
    throw new Error("Action not allowed");
  },
});
