const bcrypt = require("bcryptjs");
const conn = require("./conn");
const DATABASE = "SteamOrt";
const USER = "Users";
const gamesUser = require("./games");

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
  const user = null;
  const userExiste = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .findOne({ email: email });

  if (userExiste) {
    let purchases = userExiste.purchases;
    const gameExiste = await connectiondb
      .db(DATABASE)
      .collection(USER)
      .findOne({ game: purchases.game });

    if (!gameExiste) {
      user = await connectiondb
        .db(DATABASE)
        .collection(USER)
        .findOneAndUpdate(
          { email: email },
          { $push: { purchases: { game, vecesJugadas: 0 } } }
        );
    } else {
      throw new Error("El juego ya fue comprado");
    }
  }
  return user;
}

async function myGames(email) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .findOne({ email: email });
  if (user && user.purchases.length != 0) {
    const purchases = user.purchases;
    let myGames = [];
    for (let index = 0; index < purchases.length; index++) {
      let purchase = purchases[index];
      let vecesJugadas = purchase.vecesJugadas;
      let gameAux = await gamesUser.getGameByName(purchase.game);

      let game = {
        name: gameAux[0].name,
        image: gameAux[0].image,
        vecesJugadas: vecesJugadas,
      };
      myGames.push(game);
    }
    return myGames;
  } else {
    throw new Error("El usuario no posee juegos");
  }
}

async function playGame(email, gameName) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USER)
    .findOne({ email: email });

  if (user.purchases.length != 0) {
    user.purchases.find((purchase) => purchase.game == gameName).vecesJugadas++;
    return await connectiondb
      .db(DATABASE)
      .collection(USER)
      .replaceOne({ email: email }, user);
  } else {
    throw new Error("El usuario no posee juegos");
  }
}

module.exports = {
  addUser,
  findUser,
  addPurchase,
  myGames,
  playGame,
};
