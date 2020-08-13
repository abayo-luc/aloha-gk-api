"use strict";
const uuid = require("uuid").v4;
const products = require("../testData/products");
const categories = require("../testData/categories");

const productCategories = products.map((item) => ({
  id: uuid(),
  productId: item.id,
  categoryId: categories[Math.floor(Math.random() * 4)].id,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ProductCategories",
      productCategories,
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProductCategories", null, {});
  },
};
