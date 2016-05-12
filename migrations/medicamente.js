import Sequelize from 'sequelize';
import chalk     from 'chalk';
import {parse}   from 'node-xlsx';

// Import model
import Medicamente from '../models/medicamente';


export default class MedicamenteMigration {
  
  constructor() {
    this.workSheetsFromFile = [];
    this.datLength = 0;
    this.parseFiles();
  }
  
  // Parse the filtered xlsx
  parseFiles(cb) {
    console.log(chalk.yellow('Parsing meds file'));
    this.workSheetsFromFile = parse('files/meds.xlsx');
    console.log(chalk.green('Meds file parsed!'));
    
    this.datLength = this.workSheetsFromFile[0].data.length;
    this.syncDB();
  }
  
  // Insert med one at a time
  async insertMeds(med, key) {
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
      
      if (key + 1 >= this.datLength) {
        console.log(chalk.green('All rows inserted'), key + 1);
      }
      
    } catch(err) {
      console.error(chalk.red('Error:'), err);
    }
    
  }
  
  // Sync the meds table and insert data
  syncDB() {
    Medicamente.sync({force: true}).then(() => {
      const {data} = this.workSheetsFromFile[0];
      console.log(chalk.green('Table Created!'));
      data.map((d, k) => { this.insertMeds(d, k) })
    });
  }
}
