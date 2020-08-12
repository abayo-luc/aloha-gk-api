const router = require("express").Router();
const { getAllProducts, getOne } = require("./controller");

router.route("/").get(getAllProducts);
router.route("/:id").get(getOne);

module.exports = router;
