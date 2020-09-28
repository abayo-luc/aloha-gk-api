const router = require("express").Router();
const { attacheModel } = require("../../../middlewares/request");
import RestController from "../../RestController";
import { allCategories } from "./controller";

router.use(attacheModel("Category"));
router.route("/").get(allCategories, RestController.findAll);
router.route("/:id").get(RestController.getById);

module.exports = router;
