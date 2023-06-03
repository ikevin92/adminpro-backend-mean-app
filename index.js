require('dotenv').config();
const logger = require('morgan');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear servidor express
const app = express();

// Configurar CORS
app.use(cors());
// Morgan
app.use(logger('combined'));

const port = 3000;

// Base de datos
dbConnection();

//Rutas
app.get('/api/usuarios', require('./routes/usuarios.routes'));

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
