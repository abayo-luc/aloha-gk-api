import Product from "../../../models/product";
import database from "../../../models";
export const allCategories = (req, res, next) => {
  req.modelQuery = {
    attributes: {
      include: [
        "Category.*",
        [
          database.sequelize.fn(
            "COUNT",
            database.sequelize.col("productcategories.id")
          ),
          "productsCounter",
        ],
      ],
    },
    include: [
      {
        model: database.ProductCategory,
        as: "productcategories",
        attributes: [],
      },
    ],
    group: ["Category.id", "productcategories.id"],
  };
  return next();
};
