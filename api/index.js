require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const { db } = require('./src/database');
const userRouter = require('./src/routes/userRouter');
const operationRouter = require('./src/routes/operationRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/user', userRouter);
app.use('/operation', operationRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: true })
    .then(() => console.log('Database connected'));
});
