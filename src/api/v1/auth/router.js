const router = require("express").Router();
import { signUp, signIn } from "./controller";
import RestController from "../../RestController";
import { isAuthenticated } from "../../../middlewares/request";

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/current", isAuthenticated, RestController.getCurrentUser);
module.exports = router;
