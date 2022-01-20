'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRefreshToken', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaulValue: Sequelize.UUIDV4,
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiredAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addColumn('UserRefreshToken', 'userId', {
      type: Sequelize.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserRefreshToken');
  },
};
