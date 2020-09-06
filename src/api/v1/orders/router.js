import OrderController from "./controller";
import { isAuthenticated, attacheModel } from "../../../middlewares/request";
import { createRules } from "./validate";
import RestController from "../../RestController";

const router = require("express").Router();

router.get(
  "/",
  isAuthenticated,
  attacheModel("Order"),
  OrderController.all,
  RestController.getAll
);
router.post("/", isAuthenticated, createRules, OrderController.create);
router.get(
  "/:id",
  isAuthenticated,
  attacheModel("Order"),
  OrderController.one,
  RestController.getOne
);
module.exports = router;
