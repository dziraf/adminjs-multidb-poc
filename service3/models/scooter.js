const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Scooter extends Model {}

  Scooter.init(
    {
      manufacturer: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Scooter',
      tableName: 'scooters',
    },
  );

  return Scooter;
};
