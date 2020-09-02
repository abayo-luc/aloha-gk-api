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
      listPrice: Sequelize.FLOAT,
      totalReviews: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      avRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      inStock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      discountRate: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      fullDescription: {
        type: Sequelize.TEXT,
      },
      shortDescription: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM("active", "hidden", "disabled"),
        defaultValue: "hidden",
      },
      minOrderQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      maxOrderQuantity: Sequelize.INTEGER,
      availability: {
        type: Sequelize.ENUM("all", "private", "public"),
        defaultValue: "all",
      },
      promoText: Sequelize.TEXT,
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
