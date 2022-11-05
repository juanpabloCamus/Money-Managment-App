const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('operation', {
    type: {
      type: DataTypes.ENUM('Entry', 'Withdraw'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    concept: {
      type: DataTypes.STRING,
    },
  }, { timestamps: true });
};
