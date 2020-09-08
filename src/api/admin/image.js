import crud from "express-sequelize-crud";
import { Image } from "../../models";
import { imageModels as include } from "../../constants/associatedModels";

export default crud("/images", Image, {
  getList: (filter, limit, offset, order) =>
    Image.findAndCountAll({
      where: filter,
      limit,
      offset,
      order,
      include,
    }),
});
