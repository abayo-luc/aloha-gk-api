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
  create: async (body) => {
    const product = await Product.create({
      ...body,
      files: undefined,
    });
    appEvents.emit("upload_product_image", {
      productId: product.id,
      files: body.files,
    });
    return product;
  },
  update: async (body, options) => {
    const product = await Product.findOne({ ...options, include });
    if (!product) throw new Error(`Product doesn't exist`);
    const productAttributes = { ...body, images: undefined, files: undefined };
    product.set(productAttributes);

    appEvents.emit("update_product_image", { product, images: body.images });
    appEvents.emit("upload_product_image", {
      productId: product.id,
      files: body.files,
    });

    await product.save();
    return product;
  },
});
