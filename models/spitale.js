import Sequelize from 'sequelize';
import connection from '../connection';

const Spitale = connection.define('spitale', {
  denumire: {
    type: Sequelize.STRING
  },
  oras: {
    type: Sequelize.STRING
  },
  adresa: {
    type: Sequelize.STRING
  },
  latitudine: {
    type: Sequelize.STRING
  },
  longitudine: {
    type: Sequelize.STRING
  },
  program: {
    type: Sequelize.STRING
  },
  telefon: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

export default Spitale;
