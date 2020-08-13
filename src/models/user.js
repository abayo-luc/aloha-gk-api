"use strict";

const { encrypt } = require("../utils/helpers");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      names: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Users",
    }
  );
  User.beforeSave(async (user, _options) => {
    const hashedPwd = await encrypt(user.password);
    user.setDataValue("password", hashedPwd);
  });
  User.afterCreate(async (user, _options) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>, send email or text message");
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
