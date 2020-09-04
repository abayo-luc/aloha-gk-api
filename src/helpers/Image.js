const cloudinary = require("cloudinary").v2;
import { Image } from "../models";
require("dotenv").config();
const {
  CLOUDINARY_API_SCRET: api_secret,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_NAME: cloud_name,
} = process.env;
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

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
        if (imagesToRemove.length)
          await Image.destroy({ where: { id: imagesToRemove } });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async cloudinaryUpload({ files, productId }) {
    try {
      if (files?.length && productId) {
        const results = await Promise.all(
          files.map((img) =>
            cloudinary.uploader.upload(
              img.src,
              {
                resource_type: "image",
                folder: "devs/aloha_gk",
                use_filename: true,
              },
              function (error, result) {
                if (!error) {
                  return result;
                }
              }
            )
          )
        );

        await Image.bulkCreate(
          results.map((result) => ({
            ...result,
            created_at: undefined,
            tags: undefined,
            access_mode: undefined,
            url: result.secure_url,
            productId,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
