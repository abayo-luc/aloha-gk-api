"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      productId: DataTypes.UUID,
      categoryId: DataTypes.UUID,
    },
    {
      tableName: "ProductCategories",
    }
  );
  ProductCategory.associate = (models) => {
    // associations can be defined here
  };
  return ProductCategory;
};
