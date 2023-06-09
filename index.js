require('dotenv').config();
const logger = require('morgan');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear servidor express
const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

//Carpeta publica
app.use(express.static('./public'));

// Morgan
app.use(logger('combined'));
// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

//Rutas
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
