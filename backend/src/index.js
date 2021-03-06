//uso de dotenv para seguridad de credenciales de la base de datos
require('dotenv').config();
//importar la declaracion de la app
import app from './app';

require('./database');

async function main() {
    await app.listen(app.get('port'));
    console.log('server on port', app.get('port'));
}

main();
