require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss" } );

import fs from 'fs'
import wget from 'node-wget'
import fetch from 'node-fetch'
import _ from 'lodash';

var url = 'http://medfind.adfaber.org/wp-json/wp/v2/medfind_database'
var latest = {
  'medicamente': new Date().getTime(),
  'farmacii': new Date().getTime(),
  'spitale': new Date().getTime()
}

import FarmaciiMigration from './migrations/farmacii';
import MedicamenteMigration from './migrations/medicamente';
import SpitaleMigration from './migrations/spitale';

var migrations = {
  'farmacii': FarmaciiMigration,
  'medicamente': MedicamenteMigration,
  'spitale': SpitaleMigration
}

export default class Migration {
  constructor() {
    console.log('[Migration] interval started')
    setTimeout(() => {
      this.checkMigration()
    }, 5000)
  }

  checkMigration () {
    console.log('[Migration] check migration')
    this.getLatestModfiedInfo(() => this.checkIfNewFile())
  }

  setLatestModfiedInfo (data, callback) {
    try {
      var json = JSON.stringify(data)
      console.log('[Migration] set latest info', json);
      fs.writeFile('./latest.txt', json, (err) => {
        if(err) {
          console.log(err);
        }
        console.log('[Migration] latest info has been set');
        callback()
      });
    } catch(err) {
      console.log('err', err);
    }
  }

  getLatestModfiedInfo (callback) {
    console.log('[Migration] get latest info');
    fs.readFile('./latest.txt', 'utf8', (err, data) => {
      if (err) {
        return this.setLatestModfiedInfo(latest, callback)
      }

      latest = JSON.parse(data)
      callback()
    });
  }

  checkIfNewFile () {
    console.log('[Migration] fetch latest info');
    fetch(url).then(res => res.json()).then((data) => {
      console.log('[Migration] got the latest info');
      _.forEach(data, (file) => {
        console.log(`[Migration][${file.slug}] check to see if migration is needed`);
        var modifiedDate = new Date(file.modified).getTime()
        if (modifiedDate > latest[file.slug]) {
          console.log(`[Migration][${file.slug}] !!! found new file --> start migration`);
          latest[file.slug] = modifiedDate
          try {
            console.log(`[Migration][${file.slug}] !!! download file`);
            wget({url: file.acf.data, dest: `download/`}, (error, response, body) => {
              if (error) {
                return console.log('[Migration] download error')
              }
              console.log(`[Migration][${file.slug}] !!! start migration`);
              setTimeout(() => {
                new migrations[file.slug]('download')
              }, 1000)
            });
          } catch (err) {
            console.log(err)
          }
        }
      })

      this.setLatestModfiedInfo(latest, () => {
        setTimeout(() => {
          this.checkMigration()
        }, 5000)
      })
    });
  }
}