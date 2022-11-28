const users = require("./../data/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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

async function myGames(email) {
  return users.myGames(email);
}

async function playGame(email, gameName) {
  return users.playGame(email, gameName);
}
module.exports = {
  addUser,
  findUser,
  generatedToken,
  addPurchase,
  myGames,
  playGame,
};
