"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      summary: DataTypes.TEXT,
      avRating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      totalReviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalItems: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discountRate: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "Products",
    }
  );
  Product.associate = (models) => {
    Product.hasMany(models.Review, {
      foreignKey: "productId",
      as: "reviews",
    });
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
    Product.hasMany(models.Image, {
      foreignKey: "productId",
      as: "images",
    });
  };
  return Product;
};
