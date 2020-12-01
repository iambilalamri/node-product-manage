// Autorization admin
function admin(req, res, next) {
  // 401 Unautorized
  // 403 Forbidden
  if (!req.user.isAdmin) return res.status(403).send("Access denied!");
  next();
}

function provider(req, res, next) {
  if (!req.user.role.include("PROVIDER"))
    return res.status(403).send("Access denied!");
  next();
}

function customer(req, res, next) {
  if (!req.user.role.include("CUSTOMER"))
    return res.status(403).send("Access denied!");
  next();
}

module.exports = {
  customer,
  provider,
  admin,
};
