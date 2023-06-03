const express = require('express');

// crear servidor express
const app = express();
const port = 3000;

//Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'Hola mundo',
  });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
