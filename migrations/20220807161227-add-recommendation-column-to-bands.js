'use strict';
// require DataTypes from Sequelize so you can specify datatypes
const { DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // call addColum method on queryInterface and include "await" because method is async
    // first argument is name of the table to add column to
    // second argument is name of the column
    // third argument is datatype
    await queryInterface.addColumn('bands', 'recommendation', {
          type: DataTypes.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // first argument is table from which we need to remove column
    // second argument is column needing to be removed
    await queryInterface.removeColumn('bands', 'recommendation')
  }
};
