const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'operation',
    {
      type: {
        type: DataTypes.ENUM('Entry', 'Withdraw'),
        notNull: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      concept: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true },
  );
};
