const jwt = require("jsonwebtoken");

function generateToken(params = {}) {
  return jwt.sign(params, process.env.HASH_SECRET, {
    expiresIn: 86400,
  });
}
module.exports = generateToken;
