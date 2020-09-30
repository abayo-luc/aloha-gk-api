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
  update: async (body, options) => {
    const order = await Order.findOne(options);
    if (!order) throw new Error(`Order doesn't exist`);
    ["shippedOn", "status", "comment", "taxId", "deliveryFee"].forEach(
      (key) => {
        order[key] = body[key];
      }
    );
    await order.save();
    return order;
  },
  getList: (filter, limit, offset, order) =>
    Order.findAndCountAll({
      where: filter,
      limit,
      offset,
      order,
      include,
    }),
  getOne: (id) =>
    Order.findByPk(id, {
      include,
    }),
});
