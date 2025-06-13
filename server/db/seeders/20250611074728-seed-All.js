'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Users
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Alice',
          email: 'alice@example.com',
          password: 'password123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bob',
          email: 'bob@example.com',
          password: 'password123',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Charlie',
          email: 'charlie@example.com',
          password: 'password123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Diana',
          email: 'diana@example.com',
          password: 'password123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Eve',
          email: 'eve@example.com',
          password: 'password123',
          role: 'moderator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Teas (userId: 1–5)
    await queryInterface.bulkInsert(
      'Teas',
      [
        {
          name: 'Green Zen',
          location: '35.011564 135.768149', // Kyoto, Japan
          image:
            'https://cdn.teaworkshop.ru/media/cache/sylius_shop_api/c8/b0/100ddcae524512a5604720c97ac3.jpg',
          description: 'Soothing green tea from Japan.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Oolong Blossom',
          location: '23.697810 120.960515', // Central Taiwan (Nantou)
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYL996jQ5EoACrmYhVrf8lVB2cuq_qeNCEXePi3frz_ZcPkCbbA0ASS1IaLkMOnMIGQ2Y&usqp=CAU',
          description: 'Floral and fruity.',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Masala Chai',
          location: '26.846695 80.946167', // Uttar Pradesh, India (representative for spiced chai)
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStPnuDxt0hYxc4IYmORumjcX_nYKBP7sRj61vxbrOsMJJRTxLDBo6LFgDewJkS-jsMXno&usqp=CAU',
          description: 'Spicy and energizing.',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'White Peony',
          location: '27.103722 118.185623', // Fujian, China (main region for Bai Mudan)
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHn0ViLTDuTkuXog07oWKbyXzi7p9HeYAX3Q&s',
          description: 'Delicate white tea.',
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mint Breeze',
          location: '34.020882 -6.841650', // Rabat, Morocco
          image:
            'https://cdn.teaworkshop.ru/media/cache/sylius_shop_api/c8/b0/100ddcae524512a5604720c97ac3.jpg',
          description: 'Refreshing mint blend.',
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Comments (userId: 1–5, teaId: 1–5)
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          commentText: 'Absolutely love this tea!',
          userId: 2,
          teaId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          commentText: 'Nice flavor, but a bit strong.',
          userId: 3,
          teaId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          commentText: 'Perfect for mornings.',
          userId: 4,
          teaId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          commentText: 'So light and smooth.',
          userId: 5,
          teaId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          commentText: 'Very refreshing!',
          userId: 1,
          teaId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Teas', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
