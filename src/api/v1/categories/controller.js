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
            database.sequelize.col("productcategories.categoryId")
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
    group: ["Category.id", "productcategories.categoryId"],
  };
  return next();
};
