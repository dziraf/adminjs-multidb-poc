const path = require('path');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, './.env') })

const { createConnections } = require('./connection');

const PORT = process.env.PORT || 3000;

AdminJS.registerAdapter(AdminJSSequelize);
const run = async () => {
  const [dbOne, dbTwo, dbThree] = await createConnections();
  const app = express();
  const adminJs = new AdminJS({
    resources: [{
      resource: dbOne.Car,
      options: {
        navigation: {
          name: 'Database 1',
          icon: 'Car',
        }
      }
    }, {
      resource: dbTwo.Bicycle,
      options: {
        navigation: {
          name: 'Database 2',
          icon: 'Bicycle',
        }
      }
    }, {
      resource: dbThree.Scooter,
      options: {
        navigation: {
          name: 'Database 3',
          icon: 'Scooter',
        }
      }
    }]
  });

  if (process.env.NODE_ENV !== 'production') adminJs.watch();
  else await adminJs.initialize();

  const router = AdminJSExpress.buildRouter(adminJs);

  app.use(adminJs.options.rootPath, router);

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

run();
