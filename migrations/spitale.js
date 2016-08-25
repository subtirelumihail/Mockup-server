import Sequelize from 'sequelize';
import chalk     from 'chalk';
import {parse}   from 'node-xlsx';

// Import model
import Spitale from '../models/spitale';

export default class SpitaleMigration {

  constructor(folder = 'files') {
    this.workSheetsFromFile = [];
    this.index = 0;
    this.folder = folder
    this.parseFiles();
  }

  // Parse the filtered xlsx
  parseFiles(cb) {
    console.log(chalk.yellow('Parsing spitale file'));
    this.workSheetsFromFile = parse(`${this.folder}/spitale.xlsx`);
    console.log(chalk.green('Spitale file parsed!'));

    this.syncDB();
  }

  // Insert one at a time
  async insertSpitale(pharmacy, key) {
    try {
      const title = pharmacy[0].split(','); //This should be deleted

      await Spitale.create({
        denumire:    pharmacy[0],
        oras:        pharmacy[2],
        adresa:      pharmacy[3],
        latitudine:  pharmacy[4],
        longitudine: pharmacy[5],
        program:     pharmacy[6],
        telefon:     pharmacy[7],
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
    Spitale.sync({force: true}).then(() => {
      const {data} = this.workSheetsFromFile[0];
      console.log(chalk.green('Table Spitale Created!'));
      data.map((d, k) => { this.insertSpitale(d, k) })
    })
  }
}
