const router = require("express").Router();
const { attacheModel } = require("../../../middlewares/request");
import RestController from "../../RestController";

router.use(attacheModel("Category"));
router.route("/").get(RestController.getAll);
router.route("/:id").get(RestController.getById);

module.exports = router;
