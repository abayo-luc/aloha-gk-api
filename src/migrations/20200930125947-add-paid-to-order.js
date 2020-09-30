'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Orders', 'paid', {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      });
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Orders', 'paid', )
  }
};
