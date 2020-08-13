"use strict";
const products = require("../testData/products");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", products, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
