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
// Morgan
app.use(logger('combined'));
// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
