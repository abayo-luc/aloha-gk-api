"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productAttributes: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "OrderItems",
    }
  );
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: "orderId",
      as: "item",
    });
    OrderItem.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };
  return OrderItem;
};
