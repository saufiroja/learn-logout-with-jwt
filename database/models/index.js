const { User } = require('./User.models');
const { UserRefreshToken } = require('./UserRefreshToken.models');

User.hasOne(UserRefreshToken, { foreignKey: 'userId' });

UserRefreshToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, UserRefreshToken };
