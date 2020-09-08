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
    try {
      const productAttributes = {
        ...body,
        files: undefined,
        categories: undefined,
      };
      const product = await Product.create({
        ...productAttributes,
      });
      if (body.category_ids) {
        await product.setCategories(body.category_ids);
      }

      appEvents.emit("upload_product_image", {
        productId: product.id,
        files: body.files,
      });
      return product;
    } catch (error) {
      return error.message;
    }
  },
  update: async (body, options) => {
    try {
      const product = await Product.findOne({ ...options, include });
      if (!product) throw new Error(`Product doesn't exist`);
      const productAttributes = {
        ...body,
        images: undefined,
        files: undefined,
      };
      await product.update(productAttributes);
      if (body.category_ids) {
        await product.setCategories(body.category_ids);
      }

      appEvents.emit("upload_product_image", {
        productId: product.id,
        files: body.files,
      });

      appEvents.emit("update_product_image", { product, images: body.images });

      return product;
    } catch (error) {
      throw error.message;
    }
  },
});
