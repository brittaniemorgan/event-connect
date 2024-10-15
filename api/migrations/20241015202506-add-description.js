'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Events', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'No description provided'
    });
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.removeColumn('Tickets', 'description');
  }
};
