const express = require('express');
const app = express();
const port = 3000;
const db = require('./db_conf');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(port, (err) => {
  if (err) {
    throw new Error('Error:', err);
  }
  console.log(`Server is listening on ${port}`);
});