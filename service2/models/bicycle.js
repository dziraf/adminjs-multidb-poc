const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bicycle extends Model {}

  Bicycle.init(
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
      modelName: 'Bicycle',
      tableName: 'bicycles',
    },
  );

  return Bicycle;
};
