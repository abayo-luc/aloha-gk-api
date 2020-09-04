import "@babel/polyfill";
import express from "express";
import passport from "passport";
import cors from "cors";
import crud from "express-sequelize-crud";
import passportJwt from "./middlewares/passport";
import adminRouter from "./api/admin";
import routers from "./api";
import adminRouters from "./api/admin";
import registerEvents from "./middlewares/registerEvents";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
passport.use(passportJwt);

registerEvents();
app.use(passport.initialize());
app.use("/api", routers);

/**
 * Admin routers
 */

app.use("/api/v1", adminRouters);

/**
 * Catch application error
 */
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({
    message: err.message || "Action failed",
  });
});

app.use("*", (req, res) =>
  res.status(404).json({
    message: "API endpoint not found!",
  })
);
export default app;
