const users = require("./../data/user");
const jwt = require("jsonwebtoken");
async function addUser(user) {
  return users.addUser(user);
}
async function findUser(email, password) {
  return users.findUser(email, password);
}
function generatedToken(user) {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.CLAVESECRETA,
    { expiresIn: "1h" }
  );
  return token;
}

async function addPurchase(email, game) {
  return users.addPurchase(email, game);
}

module.exports = {
  addUser,
  findUser,
  generatedToken,
  addPurchase,
};
