'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('Orders', 'paid', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        }),
        queryInterface.addColumn('Orders', 'deliveryFee', {
          type: Sequelize.DataTypes.FLOAT,
          defaultValue: 1000
        }),
        queryInterface.addColumn('Orders', 'subTotal', {
          type: Sequelize.DataTypes.FLOAT,
          defaultValue: 0
        })
      ])
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'paid' ),
      queryInterface.removeColumn('Orders', 'deliveryFee'),
      queryInterface.removeColumn('Orders', 'subTotal')
    ]);
   
  }
};
