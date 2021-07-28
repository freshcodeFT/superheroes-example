'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'superpowers',
      [
        {
          superpower: 'sleep-test',
          created_at: new Date(),
          updated_at: new Date(),
        },
        { superpower: 'eat', created_at: new Date(), updated_at: new Date() },
        { superpower: 'fly', created_at: new Date(), updated_at: new Date() },
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
