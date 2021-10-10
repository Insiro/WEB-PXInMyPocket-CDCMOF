'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 return await queryInterface.addColumn(‘Orders’, ‘arrived’, { type:Sequelize.STRING(200) });
	  /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
