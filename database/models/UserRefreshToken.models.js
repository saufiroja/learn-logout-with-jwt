const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('./sequelize');

class UserRefreshToken extends Model {}

UserRefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'UserRefreshToken',
  }
);

module.exports = { UserRefreshToken };
