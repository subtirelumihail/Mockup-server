import express from 'express';
import bodyParser from 'body-parser';
import geolib from 'geolib';
import _ from 'lodash';
import morgan from 'morgan';

// Models
import Medicamente from './models/medicamente';

var app = express();

const config = {
  port: 8080
}

app.use(morgan('combined'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const infos = [
  {
    title: 'Vrei sa renunti la fumat?',
    content: '58% dintre fumători au încercat deja să se lase de fumat, dar nu au reușit. Cei mai mulți dintre ei nu au găsit încă doza câștigătoare de putere și hotărâre. Mai mult decât atât, din momentul în care au eșuat să se lase, au devenit defensivi. S-au resemnat că sunt incapabili să scape de acest obicei și, astfel, și-au pierdut și pornirea de a mai încerca. \n\nUnul dintre cele mai importante motive pentru care oamenii nu reușesc să se lase de fumat este acela că argumentele obiective, raționale, medicale care le sunt invocate mereu nu îi ating. Dacă sunt întrebați, oamenii pot să numească, de regulă, efectele nocive ale fumatului asupra sănătății lor. Ei știu că, fumând, au șanse mai mari să se îmbolnăvească de cancer sau să dezvolte o boală de inimă. Totuși, toate aceste riscuri le par foarte îndepărtate. Par niște lucruri care lor nu li s-ar putea întâmpla niciodată.',
    url: 'http://stopfumat.eu'
  },
  {
    title: 'Ce este poliartrita reumatoidă?',
    content: 'Poliartrita reumatoidă este o tulburare inflamatorie cronică ce afectează, de obicei, articulaţiile mici de la mâini şi de la picioare. Spre deosebire de osteoartrită, poliartrita reumatoidă afectează învelişul articulaţiilor dumneavoastră, cauzând o inflamaţie dureroasă ce poate determina eroziunea osului şi deformarea articulaţiei. \n\nTulburare autoimună, poliartrita reumatoidă are loc atunci când sistemul dumneavoastră imunitar atacă în mod eronat propriile ţesuturi ale corpului. Pe lângă problemele care apar la nivelul articulaţiilor, poliartrita reumatoidă poate afecta întreg organismul, manifestându-se cu febră şi oboseală. \n\nPoliartrita reumatoidă afectează aproximativ 1% din populaţia adultă din întreaga lume. Poate debuta la orice vârstă, dar, de obicei, apare la persoane cu vârste cuprinse între 40 şi 70 de ani. Femeile sunt de 2-3 ori mai predispuse să dezvolte afecţiunea decât bărbaţii.',
    url: 'http://inspirart.ro/ce-este-pr'
  },
  {
    title: 'Ce este Disfuncţia Erectilă?',
    content: 'Este o afecţiune medicală care poate apărea izolat sau ca urmare a altor afecţiuni medicale. Ca majoritatea celorlalte afecţiuni medicale, există mai multe cauze şi tratamente care te pot ajuta să o rezolvi. Însă spre deosebire de alte afecţiuni medicale, poate fi dificil pentru bărbaţi să o accepte. \n\nDe exemplu, Disfuncţia Erectilă poate avea un efect negativ asupra imaginii de sine. Însă cu cât înţelegi mai bine motivele ştiinţifice ale acestei afecţiuni - o cantitate insuficientă de sânge ajunge sau rămâne în penis în timpul excitaţiei - cu atât mai puţin stânjenitor va fi.',
    url: 'http://suntbarbat.ro'
  },
  {
    title: 'Vaccin pneumococic',
    content: 'Vaccinurile pneumococice sunt preparate antigenice folosite pentru imunizare împotriva diferitelor tulpini de Streptococcus pneumoniae (pneumococ). Scopul vaccinării cu un vaccin pneumococic este de a preveni boala pneumococică invazivă, amenințătoare de viață, și, în mai mică măsură, alte infecții localizate produse de acest germen patogen. \n\nVaccinurile pneumococice asigură protecție exclusiv împotriva serotipurilor de S. pneumoniae incluse în vaccin, nu și împotriva altor serotipuri de pneumococ și nici împotriva altor microorganisme care determină boli invazive, de exemplu Haemophilus influenzae sau Neisseria meningitidis (meningococul). Împotriva acestor germeni există alte vaccinuri specifice.',
    url: 'https://ro.wikipedia.org/wiki/Vaccin_pneumococic'
  },
  {
    title: 'Lorem ipsum dolore',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  \n\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    url: 'https://lorem.com'
  },
  {
    title: 'Lorem ipsum dolore',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  \n\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    url: 'https://lorem.com'
  },
  {
    title: 'Lorem ipsum dolore',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  \n\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    url: 'https://lorem.com'
  }
]

app.use(express.static('apk'));

app.get('/info', (req, res) => {
  res.json(infos);
});

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
    res.json(autocompleteData[0]);
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

// app.post('/farmacii', (req, res) => {
//   const closest = geolib.findNearest(req.body.coords, farmacii, 0, 3);
//   res.json(Array.isArray(closest) ? closest : [closest]);
// });

app.listen(config.port, function () {
  console.log(`Server is on ${config.port} !!`);
});
