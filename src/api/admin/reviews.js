import crud from "express-sequelize-crud";
import { Review } from "../../models";

export default crud("/reviews", Review);
