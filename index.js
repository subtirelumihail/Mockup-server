import express from 'express';
import bodyParser from 'body-parser';
import geolib from 'geolib';
import _ from 'lodash';
import morgan from 'morgan';

import MigrationClass from './migration'

// Models
import Medicamente from './models/medicamente';
import Farmacii from './models/farmacii';
import Spitale from './models/spitale';

var app = express();

const config = {
  port: 8080
}

app.use(morgan('combined'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('apk'));

new MigrationClass()

app.post('/medicamente', (req, res) => {
  const {title} = req.body;
  Medicamente.findAll({
    where: {
      denumire: {
        $like: `${title}%`
      }
    },
    limit: 200
  }).then( data => {
    const autocompleteData = _.map(data, i => {
      let title = i.denumire.split(/\W+/g);
      data.denumire = title[0].trim();
      return data;
    });
    res.json(_.uniqBy(autocompleteData[0], 'denumire'));
  });
});

app.post('/medicamente/autocomplete', (req, res) => {
  const {s} = req.body;
  Medicamente.findAll({
    attributes: ['denumire'],
    where: {
      denumire: {
        $like: `${s}%`
      }
    },
    limit: 1000
  }).then( data => {
    const autocompleteData = _.map(data, i => {
      let title = i.denumire.split(/\W+/g);
      return title[0].trim();
    });
    res.json(_.uniq(autocompleteData).slice(0, 20));
  });
});

app.post('/farmacii', (req, res) => {
  const {latitude, longitude, program} = req.body;

  const programMapping = {
    'toate': '',
    'non-stop': 'NON STOP'
  }

  var queryOpt = {
    limit: 1000
  }

  if (programMapping[program]) {
    queryOpt.where = {
      program: programMapping[program]
    }
  }

  Farmacii.findAll(queryOpt).then( data => {
    let arr = {};

    var pharmacies = data.map( pharma => {
      let latitude = Number(pharma.dataValues.latitudine);
      let longitudine = Number(pharma.dataValues.longitudine);
      let id = pharma.dataValues.id;

      if (!isNaN(longitudine) && !isNaN(latitude) && pharma.dataValues.denumire) {
        arr[id] = {
          data: pharma.dataValues,
          longitude: Number(pharma.dataValues.longitudine),
          latitude: Number(pharma.dataValues.latitudine),
        }
      }
    })

    let locations;

    if (latitude && longitude) {
      const closest = geolib.findNearest({latitude: latitude, longitude: longitude}, arr, 0, 20);
     locations = Array.isArray(closest) ? closest : [closest];
    } else {
      locations = arr;
    }

    res.json(locations);
  });
});

app.post('/spitale', (req, res) => {
  const {latitude, longitude, program} = req.body;
  var queryOpt = {
    limit: 1000
  }

  Spitale.findAll(queryOpt).then( data => {
    let arr = {};

    var spitale = data.map( hospital => {
      let latitude = Number(hospital.dataValues.latitudine);
      let longitudine = Number(hospital.dataValues.longitudine);
      let id = hospital.dataValues.id;

      if (!isNaN(longitudine) && !isNaN(latitude) && hospital.dataValues.denumire) {
        arr[id] = {
          data: hospital.dataValues,
          longitude: Number(hospital.dataValues.longitudine),
          latitude: Number(hospital.dataValues.latitudine),
        }
      }
    })

    let locations;

    if (latitude && longitude) {
      const closest = geolib.findNearest({latitude: latitude, longitude: longitude}, arr, 0, 20);
     locations = Array.isArray(closest) ? closest : [closest];
    } else {
      locations = arr;
    }

    res.json(locations);
  });
});

app.listen(config.port, function () {
  console.log(`Server is on ${config.port} !!`);
});
