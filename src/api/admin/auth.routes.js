const router = require("express").Router();
import { isAuthenticated } from "../../middlewares/request";
import RestController from "../RestController";
import * as controller from "../v1/auth/controller";

router.post("/admin/authentications/sign-in", controller.signIn);
router.get(
  "/admin/authentications/current",
  isAuthenticated,
  RestController.getCurrentUser
);
router.put(
  "/admin/authentications/refresh",
  isAuthenticated,
  controller.refereshToken
);
export default router;
