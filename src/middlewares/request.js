import passport from "passport";
import { isEmpty } from "../utils/helpers";
export const attacheModel = (model) => {
  return (req, res, next) => {
    req.modelName = model;
    next();
  };
};

export const protectAdmin = (req, user) => {
  const isAdminRouter = [...req.originalUrl.split("v1")]
    .pop()
    .split("/")
    .includes("admin");
  if (!isAdminRouter) return false;
  return !user.isAdmin;
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
    if (protectAdmin(req, user)) {
      return res.status(403).json({
        error: {
          message: "Access denied",
        },
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
