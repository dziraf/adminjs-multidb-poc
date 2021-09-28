const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const basename = path.basename(__filename);

let db = {};
let dialectOptions;
const sequelize = new Sequelize(process.env.DB_TWO_URL, {
  dialectOptions,
  logging: console.log,
});

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
