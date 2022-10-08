'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Beras',
        price: 120000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Susu',
        price: 15000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kecap',
        price: 7000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mie Instan',
        price: 3500,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
