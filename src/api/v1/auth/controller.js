const User = require("../../../models").User;
import MainController from "../../MainController";
import { signupValidation } from "./validations";
import { verifyHash } from "../../../utils/helpers";

export const signUp = async (req, res) => {
  try {
    await signupValidation.validateAsync(req.body);
    const user = await User.create({
      ...req.body,
    });
    user.password = undefined;
    return res.status(201).json({ data: user });
  } catch (error) {
    return MainController.handleControllerError(res, error);
  }
};

export const signIn = async (req, res) => {
  try {
    await signupValidation.validateAsync(req.body);
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({
        error: {
          message: "Invalid credentials",
        },
      });
    }
    await verifyHash(user.password, req.body.password, "Invalid credentials");
    const token = await MainController.generateJWT({
      id: user.id,
      email: user.email,
    });
    user.password = undefined;
    return res.status(200).json({
      data: { user, token },
    });
  } catch (error) {
    return MainController.handleControllerError(res, error);
  }
};
