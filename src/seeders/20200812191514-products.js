"use strict";
const uuid = require("uuid").v4;
const dotenv = require("dotenv");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          id: uuid(),
          name: "Japanese 101",
          description:
            "Beginner material for Japanese grammar and conversation.",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          name: "Japanese 102",
          description:
            "Sequal to Japanese 101 material for Japanese grammar and conversation.",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          name: "Japanese 201",
          description:
            "Upper-beginner Japanese material for Japanese grammar and conversation.",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          name: "Japanese 202",
          description:
            "Sequal to Japanese 201 material for Japanese grammar and conversation.",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          name: "Japanese 301",
          description:
            "Intermediate Japanese material for Japanese grammar and conversation.",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          name: "Japanese 302",
          description:
            "Sequal to Japanese 301 material for Japanese grammar and conversation.",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          name: "Japanese 401",
          description:
            "Upper-intermediate Japanese material for Japanese grammar and conversation.",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          name: "Japanese 402",
          description:
            "Sequal to Japanese 401 material for Japanese grammar and conversation.",
          price: 12.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("People", null, {});
  },
};
