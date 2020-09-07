const { Category, Review, Image } = require("../../../models");
import { Op } from "sequelize";
import { productModels } from "../../../constants/associatedModels";
import { paginate, textSearch } from "../../../utils/queryHelpers";

export const allProductsQuery = (req, res, next) => {
  const { search, page = 1, limit = 25, category } = req.query;
  req.modelQuery = {
    include: [
      {
        model: Category,
        as: "categories",
        through: { attributes: [] },
        where: {
          ...(category
            ? {
                name: {
                  [Op.iLike]: `%${category || search}%`,
                },
              }
            : {}),
        },
      },
      {
        model: Review,
        as: "reviews",
      },
      {
        model: Image,
        as: "images",
      },
    ],
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
