import Sequelize from 'sequelize';
import chalk     from 'chalk';
import {parse}   from 'node-xlsx';

// Import model
import Farmacii from '../models/farmacii';

export default class FarmaciiMigration {

  constructor(folder = 'files') {
    this.workSheetsFromFile = [];
    this.index = 0;
    this.folder = folder
    this.parseFiles();
  }

  // Parse the filtered xlsx
  parseFiles(cb) {
    console.log(chalk.yellow('Parsing farmacii file'));
    this.workSheetsFromFile = parse(`${this.folder}/farmacii.xlsx`);
    console.log(chalk.green('Farmacii file parsed!'));

    this.syncDB();
  }

  // Insert one at a time
  async insertPharmacies(pharmacy, key) {
    try {
      await Farmacii.create({
        id_intern:   pharmacy[0],
        denumire:    pharmacy[0],
        oras:        pharmacy[2],
        adresa:      pharmacy[3],
        latitudine:  pharmacy[4],
        longitudine: pharmacy[5],
        program:     pharmacy[6],
        telefon:     pharmacy[7],
        logo:        pharmacy[8],
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
      console.log(chalk.green('Table Farmacii Created!'));
      data.map((d, k) => { this.insertPharmacies(d, k) })
    })
  }
}
