import Sequelize from 'sequelize';
import connection from '../connection';

const Medicamente = connection.define('medicamente', {
  cod_comerc: {
    type: Sequelize.STRING
  },
  denumire: {
    type: Sequelize.STRING
  },
  den_intern: {
    type: Sequelize.STRING
  },
  producator: {
    type: Sequelize.STRING
  },
  prezentare: {
    type: Sequelize.STRING
  },
  concentrat: {
    type: Sequelize.STRING
  },
  codifatc: {
    type: Sequelize.STRING
  },
  ut: {
    type: Sequelize.STRING
  },
  prescri: {
    type: Sequelize.STRING
  },
  forma: {
    type: Sequelize.STRING
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

export default Medicamente;
