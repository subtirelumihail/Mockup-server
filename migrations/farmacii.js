import Sequelize from 'sequelize';
import chalk     from 'chalk';
import {parse}   from 'node-xlsx';

// Import model
import Farmacii from '../models/farmacii';

export default class FarmaciiMigration {
  
  constructor() {
    this.workSheetsFromFile = [];
    this.index = 0;
    
    this.parseFiles();
  }
  
  // Parse the filtered xlsx
  parseFiles(cb) {
    console.log(chalk.yellow('Parsing farmacii file'));
    this.workSheetsFromFile = parse('files/farmacii.xlsx');
    console.log(chalk.green('Farmacii file parsed!'));
    
    this.syncDB();
  }
  
  // Insert one at a time
  async insertMeds(pharmacy, key) {
    try {
      const title = pharmacy[0].split(','); //This should be deleted

      await Farmacii.create({
        id_intern:   pharmacy[0],
        denumire:    title[1].trim(),
        oras:        pharmacy[2],
        adresa:      pharmacy[3],
        latitudine:  pharmacy[4],
        longitudine: pharmacy[5],
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
    Farmacii.sync({force: true}).then(() => {
      const {data} = this.workSheetsFromFile[0];
      console.log(chalk.green('Table Created!'));
      data.map((d, k) => { this.insertMeds(d, k) })
    })
  }
}
