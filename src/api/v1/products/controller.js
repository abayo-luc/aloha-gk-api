const { Category, Review, Sequelize } = require("../../../models");
import { productModels } from "../../../constants/associatedModels";

export const allProductsQuery = (req, res, next) => {
  req.modelQuery = {
    include: productModels,
  };
  return next();
};

export const findOnequery = (req, res, next) => {
  req.modelQuery = {
    include: productModels,
  };
  return next();
};
