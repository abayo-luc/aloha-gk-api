import express from "express";
import cors from "cors";
import routers from "./api";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routers);
app.use("*", (req, res) =>
  res.status(404).json({
    message: "API endpoint not found!",
  })
);
export default app;
