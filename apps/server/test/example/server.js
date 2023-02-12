/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const express = require('express');
const app = express();
const TEST_EXAMPLE_SITE_PORT = 4000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/electric', express.static(path.join(__dirname, '/electric')));
app.use('/gas', express.static(path.join(__dirname, '/gas')));

app.listen(TEST_EXAMPLE_SITE_PORT, () => {
  console.log(`listening on http://localhost:${TEST_EXAMPLE_SITE_PORT}`);
});
