"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      orderId: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      shippedOn: {
        type: Sequelize.DATE,
      },
      comment: {
        type: Sequelize.STRING,
      },
      customerId: {
        type: Sequelize.UUID,
      },
      authCode: {
        type: Sequelize.STRING(50),
      },
      reference: {
        type: Sequelize.STRING(50),
      },
      shippingId: {
        type: Sequelize.INTEGER,
      },
      taxId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("ordered", "delivered", "cancelled"),
        defaultValue: "ordered",
      },
      returned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable("Orders");
  },
};
