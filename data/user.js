const bcrypt = require("bcryptjs");
const conn = require("./conn");
const DATABASE = "SteamOrt";
const USER = "Users";

async function addUser(user) {
  console.log(user);
  if (
    user.nombre == "" ||
    user.apellido == "" ||
    user.email == "" ||
    user.password == ""
  ) {
    throw new Error("Todos los campos son requeridos");
  }
  const email = user.email;

  if (await findByEmail(email)) {
    throw new Error("El email ya fue registrado");
  }

  user.password = await bcrypt.hash(user.password, 8);
  const connectiondb = await conn.getConnection();
  const infoAdd = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .insertOne(user);
  return infoAdd;
}

async function findByEmail(email) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .findOne({ email: email });
  return user;
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
