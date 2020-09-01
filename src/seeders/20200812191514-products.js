"use strict";
const products = require("../testData/products");
const categories = require("../testData/categories");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      products.map((pro) => ({
        ...pro,
        categoryId:
          categories[Math.floor(Math.random() * categories.length)].id,
      })),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
