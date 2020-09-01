import crud from "express-sequelize-crud";
import { Product } from "../../models";
import { productModels as include } from "../../constants/associatedModels";

export default crud("/products", Product, {
  getList: (filter, limit, offset, order) =>
    Product.findAndCountAll({
      limit,
      offset,
      order,
      where: filter,
      include,
    }),
  getOne: (id) =>
    Product.findByPk(id, {
      include,
    }),
});
