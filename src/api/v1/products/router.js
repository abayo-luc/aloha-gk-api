const router = require("express").Router();
const {
  attacheModel,
  isAuthenticated,
} = require("../../../middlewares/request");
import RestController from "../../RestController";
import { allProductsQuery, findOnequery } from "./controller";
import { createReview } from "../reviews/controller";

router.use(attacheModel("Product"));
router.route("/").get(allProductsQuery, RestController.findAndCountAll);
router.route("/:id").get(findOnequery, RestController.getById);
router
  .route("/:id/reviews")
  .post(
    isAuthenticated,
    attacheModel("Review"),
    createReview,
    RestController.findOrCreate
  );
module.exports = router;
