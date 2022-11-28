const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function auth(req, res, next) {
  try {
    let token = req.header("Authorization");
    const user = jwt.verify(token, process.env.CLAVESECRETA);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}

module.exports = { auth };
