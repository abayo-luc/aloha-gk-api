import crud from "express-sequelize-crud";
import { Category } from "../../models";
import { categoryModels } from "../../constants/associatedModels";

export default crud("/categories", Category, {
  getOne: (id) =>
    Category.findByPk(id, {
      include: categoryModels,
    }),
});
