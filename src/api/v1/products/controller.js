const { Category, Review, Sequelize } = require("../../../models");
import { productModels } from "../../../constants/associatedModels";
import { paginate, textSearch } from "../../../utils/queryHelpers";

export const allProductsQuery = (req, res, next) => {
  const { search, page = 1, limit = 25, companyId } = req.query;
  req.modelQuery = {
    include: productModels,
    where: {
      ...textSearch(search, ["name", "fullDescription", "shortDescription"]),
    },
    order: [
      ["createdAt", "DESC"],
      ["name", "ASC"],
    ],
    ...paginate({ page, limit }),
  };
  return next();
};

export const findOnequery = (req, res, next) => {
  req.modelQuery = {
    include: productModels,
  };
  return next();
};
