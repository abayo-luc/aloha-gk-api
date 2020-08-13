const Product = require("../../../models").Product;
import { createReviewValidation } from "./validations";
import MainController from "../../MainController";

export const createReview = async (req, res, next) => {
  try {
    await createReviewValidation.validateAsync(req.body);
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return MainController.handleNotFound(res, "Product not found");
    }

    req.modelQuery = {
      where: {
        userId: req.user.id,
        productId: product.id,
      },
      defaults: {
        ...req.body,
        productId: product.id,
        userId: req.user.id,
      },
    };
    next();
  } catch (error) {
    return MainController.handleControllerError(res, error);
  }
};
