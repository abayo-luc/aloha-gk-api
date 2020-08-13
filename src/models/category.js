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
      },
    },
    {
      tableName: "Categories",
    }
  );
  Category.associate = (models) => {
    Category.hasMany(models.ProductCategory, {
      foreignKey: "categoryId",
    });
    Category.belongsToMany(models.Product, {
      through: models.ProductCategory,
      foreignKey: "categoryId",
      as: "products",
    });
  };
  return Category;
};
