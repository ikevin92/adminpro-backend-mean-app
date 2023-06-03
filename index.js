require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear servidor express
const app = express();
const port = 3000;

//xfXzxTGqIB17vmHw
//mean_user

// Base de datos
dbConnection();

//Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'Hola mundo',
  });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
