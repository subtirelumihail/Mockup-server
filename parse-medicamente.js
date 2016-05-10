import {parse} from 'node-xlsx';
import jsonfile from 'jsonfile';

const workSheetsFromFile = parse(`${__dirname}/medicamente.xlsx`);

jsonfile.writeFile(`${__dirname}/data.json`, workSheetsFromFile, function (err) {
  console.error(err)
})
