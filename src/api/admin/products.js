import crud from "express-sequelize-crud";
import { Product, ProductCategory, Category } from "../../models";
import { productModels as include } from "../../constants/associatedModels";
import { appEvents } from "../../middlewares/registerEvents";
import ImageHelper from "../../helpers/Image";
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
  },
  update: async (body, options) => {
    const product = await Product.findOne({ ...options, include });
    if (!product) throw new Error(`Product doesn't exist`);
    const productAttributes = { ...body, images: undefined, files: undefined };
    await product.update(productAttributes);
    if (body.category_ids) {
      await product.setCategories(body.category_ids);
    }
    if (body.files?.length) {
      await ImageHelper.cloudinaryUpload({ product, files: body.files });
    }
    appEvents.emit("update_product_image", { product, images: body.images });

    return product;
  },
});
