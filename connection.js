require('dotenv').load();

import Sequelize from 'sequelize';

const connection = new Sequelize('medfind', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

export default connection;
