import passport from "passport";
import { isEmpty } from "../utils/helpers";
export const attacheModel = (model) => {
  return (req, res, next) => {
    req.modelName = model;
    next();
  };
};

export const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, _info) => {
    if (err || !user || isEmpty(user)) {
      return res.status(401).json({
        error: {
          message: err?.message || "Invalid or expired token",
        },
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
