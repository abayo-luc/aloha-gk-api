const { Category, Review, Sequelize } = require("../../../models");

const associatedModels = [
  {
    model: Category,
    as: "categories",
  },
  {
    model: Review,
    as: "reviews",
  },
];

export const allProductsQuery = (req, res, next) => {
  req.modelQuery = {
    include: associatedModels,
  };
  return next();
};

export const findOnequery = (req, res, next) => {
  req.modelQuery = {
    include: associatedModels,
  };
  return next();
};
