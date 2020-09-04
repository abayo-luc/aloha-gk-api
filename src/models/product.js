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
      listPrice: DataTypes.FLOAT,
      fullDescription: {
        type: DataTypes.TEXT,
      },
      shortDescription: DataTypes.TEXT,
      avRating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      totalReviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      inStock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discountRate: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("active", "hidden", "disabled"),
        defaultValue: "hidden",
      },
      minOrderQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      maxOrderQuantity: DataTypes.INTEGER,
      availability: {
        type: DataTypes.ENUM("all", "private", "public"),
        defaultValue: "all",
      },
      promoText: DataTypes.TEXT,
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
    Product.hasMany(models.ProductCategory, {
      foreignKey: "productId",
      as: "productcategories",
    });
    Product.belongsToMany(models.Category, {
      through: models.ProductCategory,
      foreignKey: "productId",
      otherKey: "categoryId",
      as: "categories",
    });
    Product.hasMany(models.Image, {
      foreignKey: "productId",
      as: "images",
    });
  };
  return Product;
};
