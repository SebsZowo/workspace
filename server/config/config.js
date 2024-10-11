process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB ="PONER URL AQUII";

if(process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/baseUsers";

} else{
    urlDB = "conexion aqui"
};

process.env.URLDB = urlDB;

process.env.CADUCIDAD_TOKEN ='48h';

process.env.SEED_AUTENTICATION = process.env.SEED_AUTENTICATION || 'este-es-el-seed-desarrollo';
