"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      asset_id: Sequelize.STRING,
      public_id: Sequelize.STRING,
      version: Sequelize.BIGINT,
      version_id: Sequelize.STRING,
      signature: Sequelize.STRING,
      width: Sequelize.INTEGER,
      height: Sequelize.INTEGER,
      format: Sequelize.STRING,
      resource_type: Sequelize.STRING,
      bytes: Sequelize.INTEGER,
      type: Sequelize.STRING,
      etag: Sequelize.STRING,
      placeholder: Sequelize.BOOLEAN,
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Images");
  },
};
