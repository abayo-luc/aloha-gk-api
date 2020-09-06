import crud from "express-sequelize-crud";
import { Order } from "../../models";
import { orderModles as include } from "../../constants/associatedModels";

export default crud("/orders", Order, {
  destroy: () => {
    throw new Error("Action not allowed");
  },
  create: () => {
    throw new Error("Action not allowed");
  },
  update: (body, options) => {
    const { shippedOn, status, comment, taxId } = body;
    return Order.update(
      {
        shippedOn,
        status,
        comment,
        taxId,
      },
      { ...options, include }
    );
  },
  getList: (filter, limit, offset, order) =>
    Order.findAndCountAll({
      filter,
      limit,
      offset,
      order,
      include,
    }),
});
