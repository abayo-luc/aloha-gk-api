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
      },
      asset_id: DataTypes.STRING,
      public_id: DataTypes.STRING,
      version: DataTypes.BIGINT,
      version_id: DataTypes.STRING,
      signature: DataTypes.STRING,
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      format: DataTypes.STRING,
      resource_type: DataTypes.STRING,
      bytes: DataTypes.INTEGER,
      type: DataTypes.STRING,
      etag: DataTypes.STRING,
      placeholder: DataTypes.BOOLEAN,
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
