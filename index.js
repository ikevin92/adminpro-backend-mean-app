const express = require('express');

// crear servidor express
const app = express();
const port = 3000;

app.listen(port, () => console.log(`listening on http://localhost:${port}`));