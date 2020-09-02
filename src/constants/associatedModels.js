import database from "../models";
export const productModels = [
  {
    model: database.Category,
    as: "category",
  },
  {
    model: database.Review,
    as: "reviews",
  },
  {
    model: database.Image,
    as: "images",
  },
];

export const categoryModels = [
  {
    model: database.Product,
    as: "products",
    include: {
      model: database.Image,
      as: "images",
    },
  },
];

export const imageModels = [
  {
    model: database.Product,
    as: "product",
  },
];
