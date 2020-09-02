import crud from "express-sequelize-crud";
import { Product } from "../../models";
import { productModels as include } from "../../constants/associatedModels";
import { appEvents } from "../../middlewares/registerEvents";

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
  create: (body) => {
    return Product.create(
      {
        ...body,
      },
      {
        include,
      }
    );
  },
  update: async (body, options) => {
    const product = await Product.findOne({ ...options, include });
    if (!product) throw new Error(`Product doesn't exist`);
    const productAttributes = { ...body, images: undefined };
    product.set(productAttributes);
    await product.save();
    appEvents.emit("update_product_image", { product, images: body.images });
    return product;
  },
});
