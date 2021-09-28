const dbOne = require('./service1/models');
const dbTwo = require('./service2/models');
const dbThree = require('./service3/models');

const connect = async (sequelize) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: process.env.WIPE_DB === 'true' });
    console.log(`Connected to the database ${sequelize.config.database}`)
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
};

const createConnections = async () => {
  await Promise.all([
    dbOne,
    dbTwo,
    dbThree,
  ].map((db) => connect(db.sequelize)));

  return [dbOne, dbTwo, dbThree];
};

exports.createConnections = createConnections;
