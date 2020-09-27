import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { joiError, isEmpty } from "../utils/helpers";
import { UNIQUE_VIOLATION, INVALID_UUID } from "../utils/constants";

dotenv.config();
const { JWT_SECRET_KEY } = process.env;
class MainController {
  static home(req, res) {
    res.status(200).json({
      message: "success",
      data:{
        version: 1,
        name: 'AlohaGK API'
      }
    });
  }
  static async generateJWT(payload) {
    return new Promise((resolve, reject) =>
      jwt.sign(
        payload,
        JWT_SECRET_KEY,
        { algorithm: "HS256" },
        (error, token) => {
          if (token) {
            resolve(token);
          }
          reject(error);
        }
      )
    );
  }
  static handleNotFound(res, message = "Record not found") {
    return res.status(404).json({
      error: {
        message,
      },
    });
  }
  static async handleControllerError(res, err) {
    const error = {};
    if (err.isJoi) {
      const response = await joiError(err);
      return res.status(400).json({ error: response });
    }
    if (isEmpty(err?.errors)) {
      error.message = err?.message.includes(INVALID_UUID)
        ? "Invalid id"
        : err.message || "Bad request";
      return res.status(400).json({ error });
    }
    err.errors.forEach((element) => {
      const { path, message, type } = element;
      switch (type) {
        case UNIQUE_VIOLATION:
          error[path] = `${path} is already taken`.replace(/^\w/, (c) =>
            c.toUpperCase()
          );
          break;
        default:
          error[path] = message.replace(/^\w/, (c) => c.toUpperCase());
          break;
      }
    });
    return res.status(400).json({ error });
  }
}
export default MainController;
