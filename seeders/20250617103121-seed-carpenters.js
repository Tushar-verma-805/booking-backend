'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Carpenters', [
      {
        name: 'Amit Sharma',
        description: 'Wardrobe,Modular Kitchen,Repair',
        experience: 5,
        rating: 4.7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pooja Verma',
        description: 'Doors,Windows,Repair',
        experience: 8,
        rating: 4.9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rahul Singh',
        description: 'Custom Furniture,Repair',
        experience: 4,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sneha Mehra',
        description: 'Modular Kitchen,Installation',
        experience: 6,
        rating: 4.6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Karan Patel',
        description: 'Wardrobe,Doors,Windows',
        experience: 7,
        rating: 4.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Carpenters', null, {});
  }
};
