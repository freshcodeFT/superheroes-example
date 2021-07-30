'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'superpowers',
      [
        {
          name: 'sleep-test',
          created_at: new Date(),
          updated_at: new Date(),
        },
        { name: 'eat', created_at: new Date(), updated_at: new Date() },
        { name: 'fly', created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
