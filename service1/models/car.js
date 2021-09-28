const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {}

  Car.init(
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
      modelName: 'Car',
      tableName: 'cars',
    },
  );

  return Car;
};
