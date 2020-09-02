"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      thumbnail: DataTypes.STRING,
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "Images",
    }
  );
  Image.associate = function (models) {
    Image.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };
  return Image;
};
