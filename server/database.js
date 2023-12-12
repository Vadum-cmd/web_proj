const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('counting_app', 'admin', 'VVe3buoQ', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const RequestHistory = sequelize.define('RequestHistory', {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(RequestHistory);
RequestHistory.belongsTo(User);

sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');
});

module.exports = sequelize;
