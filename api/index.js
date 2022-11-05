require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const { db } = require('./src/database');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: true })
    .then(() => console.log('Database connected'));
});
