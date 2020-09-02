"use strict";
const uuid = require("uuid").v4;
const products = require("../testData/products");
const categories = require("../testData/categories");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ProductCategories",
      products.map((product) => ({
        id: uuid(),
        productId: product.id,
        categoryId:
          categories[[Math.floor(Math.random() * categories.length)]].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProductCategories", null, {});
  },
};
