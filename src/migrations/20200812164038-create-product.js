"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalReviews: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      avRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      totalItems: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      discountRate: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  },
};
