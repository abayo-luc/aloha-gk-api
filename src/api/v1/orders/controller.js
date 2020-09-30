import { orderModles } from "../../../constants/associatedModels";
import { paginate, textSearch } from "../../../utils/queryHelpers";
import MainController from "../../MainController";

const { Order, OrderItem } = require("../../../models");
export default class OrderController {
  static async all(req, res, next) {
    const {
      user,
      query: { search, page = 1, limit = 25, status },
    } = req;
    const moreQueries = {};
    if (["ordered", "cancelled", "delivered"].includes(status))
      moreQueries.status =  status.split(',');
    req.modelQuery = {
      include: orderModles,
      where: {
        ...textSearch(search, ["comment", "orderId", "totalAmount"]),
        ...moreQueries,
        customerId: user.id,
      },
      ...paginate({page, limit}),
      distinct: "Order.id",
    };
    next();
  }
  static async create(req, res) {
    try {
      const {
        body: { items },
        user,
      } = req;
      const totalAmount = items.reduce((prev, current) => {
        return prev + current.quantity * current.unitCost;
      }, 0);
      const order = await Order.create(
        {
          totalAmount,
          customerId: user.id,
          items,
        },
        {
          include: {
            model: OrderItem,
            as: "items",
          },
        }
      );
      return res.status(201).json({
        data: order,
      });
    } catch (error) {
      return MainController.handleControllerError(res, error);
    }
  }
  static async one(req, res, next) {
    const {
      user,
      params: { id },
    } = req;
    req.modelQuery = {
      include: orderModles,
      where: {
        customerId: user.id,
        id,
      },
    };
    return next();
  }
}
