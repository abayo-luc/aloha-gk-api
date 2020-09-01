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
];

export const categoryModels = [
  {
    model: database.Product,
    as: "products",
  },
];
