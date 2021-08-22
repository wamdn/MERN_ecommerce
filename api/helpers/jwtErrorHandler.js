export default (err, req, res, next) => {
  // TODO: log only in devlepoment
  console.error(err);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ errors: [err.message] });
  }
  next();
};
