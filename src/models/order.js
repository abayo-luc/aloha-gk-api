"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      shippedOn: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("ordered", "delivered", "cancelled"),
        defaultValue: "ordered",
      },
      comment: DataTypes.TEXT,
      customerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      authCode: DataTypes.STRING,
      reference: DataTypes.STRING,
      shippingId: DataTypes.INTEGER,
      taxId: DataTypes.INTEGER,
      returned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Orders",
    }
  );
  Order.associate = function (models) {
    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
      as: "items",
    });
    Order.belongsTo(models.User, {
      foreignKey: "customerId",
      as: "customer",
    });
  };
  return Order;
};
