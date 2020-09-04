"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
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
        unique: true,
      },
      image: DataTypes.STRING,
    },
    {
      tableName: "Categories",
    }
  );
  Category.associate = (models) => {
    Category.hasMany(models.ProductCategory, {
      foreignKey: "categoryId",
      as: "productcategories",
    });
    Category.belongsToMany(models.Product, {
      through: models.ProductCategory,
      foreignKey: "categoryId",
      otherKey: "productId",
      as: "products",
    });
  };
  return Category;
};
