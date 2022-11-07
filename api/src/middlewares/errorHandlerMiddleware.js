module.exports = ((error, req, res, next) => {
  console.log('---ERROR HANDLER---');
  console.log(error.errors[0].type);

  const e = error.errors[0];
  console.log(e);

  if (e.type === 'Validation error') {
    //  TODO agregar validacion de password
    if (e.path === 'name') return res.status(400).send({ error: 'Name must have 3 - 30 characters' });
    if (e.path === 'email') return res.status(400).send({ error: 'Email must have this format (example@example.com)' });
  }
});
