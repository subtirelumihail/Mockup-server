import FarmaciiMigration from './farmacii';
import MedicamenteMigration from './medicamente';

// Patch the console log with a timestamp
require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss" } );

new FarmaciiMigration();
new MedicamenteMigration();
