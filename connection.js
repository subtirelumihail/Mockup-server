require('dotenv').load();

import Sequelize from 'sequelize';
console.log(process.env);
const connection = new Sequelize('medfind', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

export default connection;
