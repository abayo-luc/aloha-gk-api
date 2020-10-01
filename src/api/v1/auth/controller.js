const User = require("../../../models").User;
import MainController from "../../MainController";
import { signupValidation, signinValidation } from "./validations";
import { encrypt, verifyHash } from "../../../utils/helpers";

const authPaths = {
  admin: ["/admin/authentications/sign-in"],
};

const isAdminPath = (req) =>
  authPaths.admin.includes([...req.originalUrl.split("v1")].pop());

export const signUp = async (req, res) => {
  try {
    await signupValidation.validateAsync(req.body);
    const hashedPwd = await encrypt(req.body.password);
    const user = await User.create({
      ...req.body,
      password: hashedPwd,
    });
    user.password = undefined;
    return res.status(201).json({ data: user });
  } catch (error) {
    return MainController.handleControllerError(res, error);
  }
};

export const signIn = async (req, res) => {
  try {
    await signinValidation.validateAsync(req.body);
    const user = await User.findOne({
      where: {
        email: req.body.email,
        isAdmin: isAdminPath(req),
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

export const refereshToken = async (req, res) => {
  try {
    const { user } = req;
    const token = await MainController.generateJWT({
      id: user.id,
      email: user.email,
    });
    return res.status(200).json({
      data: { user, token },
    });
  } catch (error) {
    return MainController.handleControllerError(res, error);
  }
};
