import database from "../models";
export const productModels = [
  {
    model: database.Category,
    as: "categories",
    through: { attributes: [] },
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

export const orderModles = [
  {
    model: database.User,
    as: "customer",
    attributes: {
      exclude: ["password"],
    },
  },
  {
    model: database.OrderItem,
    as: "items",
  },
];
