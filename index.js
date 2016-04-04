import express from 'express';
import bodyParser from 'body-parser';
import geolib from 'geolib';

var app = express();

const config = {
  port: 8080
}

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const medicamente = [
  {
    name: 'Paracetamolg 50mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 100mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 150mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 250mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 350mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 450mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 550mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 650mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 750mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  },
  {
    name: 'Paracetamolg 850mg',
    image: 'http://www.infobraila.ro/wp-content/uploads/2011/03/paracetamol-500mg.jpg'
  }
];

const farmacii = [
  {
    id: 1,
    name: 'Dona',
    latitude: 44.461392,
    longitude: 26.070943,
    image: 'http://ziarulclujean.ro/wp-content/uploads/2014/10/farmacie.jpg'
  },
  {
    id: 2,
    name: 'HelpNet',
    latitude: 44.461865,
    longitude: 26.071610,
    image: 'http://ziarulclujean.ro/wp-content/uploads/2014/10/farmacie.jpg'
  },
  {
    id: 3,
    name: 'SensiBlue',
    latitude: 44.462439,
    longitude: 26.072042,
    image: 'http://ziarulclujean.ro/wp-content/uploads/2014/10/farmacie.jpg'
  },
  {
    id: 4,
    name: 'Dona SensiBlue',
    latitude: 44.463044,
    longitude: 26.071275,
    image: 'http://ziarulclujean.ro/wp-content/uploads/2014/10/farmacie.jpg'
  },
  {
    id: 5,
    name: 'SensiBlue Helpnet',
    latitude: 48.8583,
    longitude: 2.2945,
    image: 'http://ziarulclujean.ro/wp-content/uploads/2014/10/farmacie.jpg'
  },
  {
    id: 6,
    name: 'SensiBlue Helpnet Dona',
    latitude: 59.3275,
    longitude: 18.0675,
    image: 'http://ziarulclujean.ro/wp-content/uploads/2014/10/farmacie.jpg'
  },
  {
    id: 7,
    name: 'SensiBlue Helpnet Dona',
    latitude: 59.916911,
    longitude: 10.727567,
    image: 'http://ziarulclujean.ro/wp-content/uploads/2014/10/farmacie.jpg'
  },
]

const infos = [
  {
    title: 'Lorem ipsum dolore',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \n\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'Lorem ipsum dolore',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \n\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'Lorem ipsum dolore',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \n\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'Lorem ipsum dolore',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \n\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'Lorem ipsum dolore',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \n\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
]

app.get('/info', (req, res) => {
  res.json(infos);
});

app.post('/medicamente', (req, res) => {
  const searchString = req.body.search.toLowerCase().trim();
  const filterMedicamente = medicamente.filter((m) => {
    let name = m.name.toLowerCase().trim();
    return name.search(searchString) > -1;
  })
  res.json(filterMedicamente);
});

app.post('/farmacii', (req, res) => {
  const closest = geolib.findNearest(req.body.coords, farmacii, 0, 3);
  res.json(Array.isArray(closest) ? closest : [closest]);
});

app.listen(config.port, function () {
  console.log(`Server is on ${config.port} !!`);
});
