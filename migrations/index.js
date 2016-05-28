import FarmaciiMigration from './farmacii';
import MedicamenteMigration from './medicamente';
import SpitaleMigration from './spitale';

// Patch the console log with a timestamp
require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss" } );

new SpitaleMigration();
new FarmaciiMigration();
new MedicamenteMigration();
