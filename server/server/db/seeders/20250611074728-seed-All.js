'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Users
    await queryInterface.bulkInsert('Users', [
      { name: 'Alice', email: 'alice@example.com', password: 'password123', role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bob', email: 'bob@example.com', password: 'password123', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Charlie', email: 'charlie@example.com', password: 'password123', role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Diana', email: 'diana@example.com', password: 'password123', role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Eve', email: 'eve@example.com', password: 'password123', role: 'moderator', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // Teas (userId: 1–5)
    await queryInterface.bulkInsert('Teas', [
      { name: 'Green Zen', location: 'Kyoto', image: 'green-zen.jpg', description: 'Soothing green tea from Japan.', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Oolong Blossom', location: 'Taiwan', image: 'oolong-blossom.jpg', description: 'Floral and fruity.', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Masala Chai', location: 'India', image: 'masala-chai.jpg', description: 'Spicy and energizing.', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'White Peony', location: 'China', image: 'white-peony.jpg', description: 'Delicate white tea.', userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mint Breeze', location: 'Morocco', image: 'mint-breeze.jpg', description: 'Refreshing mint blend.', userId: 5, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // Comments (userId: 1–5, teaId: 1–5)
    await queryInterface.bulkInsert('Comments', [
      { commentText: 'Absolutely love this tea!', userId: 2, teaId: 1, createdAt: new Date(), updatedAt: new Date() },
      { commentText: 'Nice flavor, but a bit strong.', userId: 3, teaId: 2, createdAt: new Date(), updatedAt: new Date() },
      { commentText: 'Perfect for mornings.', userId: 4, teaId: 3, createdAt: new Date(), updatedAt: new Date() },
      { commentText: 'So light and smooth.', userId: 5, teaId: 4, createdAt: new Date(), updatedAt: new Date() },
      { commentText: 'Very refreshing!', userId: 1, teaId: 5, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Teas', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
