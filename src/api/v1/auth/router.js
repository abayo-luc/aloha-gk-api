const router = require("express").Router();
import { signUp, signIn, refereshToken } from "./controller";
import RestController from "../../RestController";
import { isAuthenticated } from "../../../middlewares/request";

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/current", isAuthenticated, RestController.getCurrentUser);
router.put("/refresh", isAuthenticated, refereshToken);
module.exports = router;
