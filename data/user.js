const bcrypt = require("bcryptjs");
const { json } = require("express");
const conn = require("./conn");
const DATABASE = "SteamOrt";
const USER = "Users";

async function addUser(user) {
  user.password = await bcrypt.hash(user.password, 8);
  const connectiondb = await conn.getConnection();
  const infoAdd = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .insertOne(user);
  return infoAdd;
}

async function findUser(email, password) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .findOne({ email: email });

  if (!user) {
    throw new Error("Credenciales no validas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Credenciales no validas");
  }

  return user;
}

async function addPurchase(email, game) {
  console.log(game);
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .findOneAndUpdate(
      { email: email },
      { $push: { purchases: { game, vecesJugadas: 0 } } }
    );

  return user;
}

async function playGame(email, gameName) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .findOne({ email: email });

  user.purchases.find((purchase) => purchase.game.name == gameName)
    .vecesJugadas++;

  return await connectiondb
    .db(DATABASE)
    .collection(USER)
    .replaceOne({ email: email }, user);
}

module.exports = {
  addUser,
  findUser,
  addPurchase,
  playGame,
};
