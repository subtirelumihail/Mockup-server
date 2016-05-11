// Patch console
require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss" } );

import Sequelize from 'sequelize';
import chalk     from 'chalk';
import {parse}   from 'node-xlsx';

// Import model
import Medicamente from '../models/medicamente';

// Parse the filtered xlsx
console.log(chalk.yellow('Parsing meds file'));
const workSheetsFromFile = parse('files/meds.xlsx');
console.log(chalk.green('Meds file parsed!'));

// Insert med one at a time
async function insertMeds(med) {
  try {
    await Medicamente.create({
      cod_comerc: med[0],
      denumire: med[1],
      den_intern: med[2],
      producator: med[3],
      prezentare: med[4],
      concentrat: med[5],
      codifatc: med[6],
      ut: med[7],
      prescri: med[8],
      forma: med[9],
    });
    
    index++;
    
    if (index >= workSheetsFromFile[0].data.length) {
      console.log(chalk.green('All rows inserted'), index);
    }
    
  } catch(err) {
    console.error(chalk.red('Error:'), err);
  }
  
}

// Sync the meds table and insert data
var index = 0;
Medicamente.sync({force: true}).then(() => {
  const {data} = workSheetsFromFile[0];
  console.log(chalk.green('Table Created!'));
  data.map(insertMeds)
});
