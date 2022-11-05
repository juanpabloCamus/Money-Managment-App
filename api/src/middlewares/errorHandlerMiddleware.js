module.exports = ((error, req, res, next) => {
  console.log('error handler');
  console.error(error);
});
