import crud from "express-sequelize-crud";
import { User } from "../../models";

export default crud("/users", User, {
  destroy: () => {
    throw new Error("Deleting user not allowed!");
  },
});
