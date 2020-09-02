import { Image } from "../models";
export default class ImageHelpers {
  static async updateImage({ product, images }) {
    try {
      if (images && product) {
        const oldImages = await Image.findAll({
          where: {
            productId: product.id,
          },
        });
        const imagesToRemove = oldImages
          .map((i) => i.id)
          .filter((id) => !images.map((i) => i.id).includes(id));
        console.log(">>>>>>>>>>>>>>>>>>>>>>>", oldImages, ">>>>>>>>>>>>>>>>>>");
        const newImages = images
          .filter((im) => !im.id)
          .map((img) => ({ ...img, productId: product.id }));
        if (newImages.length) await Image.bulkCreate(newImages);
        if (imagesToRemove.length)
          await Image.destroy({ where: { id: imagesToRemove } });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
