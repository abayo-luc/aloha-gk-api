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
      subTotal: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      deliveryFee: {
        type: DataTypes.FLOAT,
        defaultValue: 1000,
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
      paid: {
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
  Order.beforeUpdate((order) => {
    if (order.deliveryFee) {
      const deliverFee = record.deliveryFee;
      const subTotal = record.items.reduce((prev, current) => {
        return prev + current.quantity * current.unitCost;
      }, 0);
      const totalAmount = subTotal + deliverFee;
      record.deliverFee = deliverFee;
      record.subTotal = subTotal;
      record.totalAmount = totalAmount;
    }
  });
  return Order;
};
