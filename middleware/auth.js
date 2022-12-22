const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function auth(req, res, next) {
  try {
    console.log("PASO POR AUTH");
    let token = req.header("Authorization");
    const user = jwt.verify(token, process.env.CLAVESECRETA);
    next();
  } catch (error) {
    console.log("NO ESTA AUTORIZADO");
    res
      .status(401)
      .send({
        error: "Debe iniciar sesión para poder acceder a este apartado",
      });
  }
}

module.exports = { auth };
