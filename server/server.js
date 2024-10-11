require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./routes/index'));

let renderHTML = path.resolve(__dirname, '../public/index.html');
app.get('/', function (req, res) {
    res.sendFile(renderHTML);
});

// Función para conectar a la base de datos usando async/await
const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Base de datos online");
    } catch (err) {
        console.error("Error al conectar a la base de datos:", err);
        throw err; // Lanza el error si no puede conectar
    }
};


// Llamar a la función para conectar a la base de datos
conectarBD();

// Escuchar en el puerto configurado
app.listen(process.env.PORT || 3000, () => {
    console.log(`Escuchando en puerto ${process.env.PORT || 3000}`);
});
