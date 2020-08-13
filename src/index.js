import express from "express";
import passport from "passport";
import cors from "cors";
import passportJwt from "./middlewares/passport";
import routers from "./api";

const app = express();
app.use(cors());
app.use(express.json());
passport.use(passportJwt);
app.use(passport.initialize());
app.use("/api", routers);
app.use("*", (req, res) =>
  res.status(404).json({
    message: "API endpoint not found!",
  })
);
export default app;
