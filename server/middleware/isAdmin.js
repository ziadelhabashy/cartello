module.exports = function isAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }
  next();
};