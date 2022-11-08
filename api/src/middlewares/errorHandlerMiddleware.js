module.exports = (error, req, res, next) => {
  console.log('---ERROR HANDLER---');

  const e = error.errors[0];
  console.log(error);

  if (e.type === 'Validation error') {
    //  TODO agregar validacion de password
    if (e.path === 'name')
      return res
        .status(400)
        .send({ error: 'Name must have 3 - 30 characters' });

    if (e.path === 'email')
      return res
        .status(400)
        .send({ error: 'Email must have this format (example@example.com)' });

    if (e.path === 'amount')
      return res.status(400).send({ error: 'The amount must be a number' });
  }
  res.send('error');
};
