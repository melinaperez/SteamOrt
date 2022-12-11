const { ObjectID } = require("bson");
const conn = require("./conn");
const DATABASE = "SteamOrt";
const GAMES = "Games";

async function getAllGames() {
  const connectiondb = await conn.getConnection();
  const games = await connectiondb
    .db(DATABASE)
    .collection(GAMES)
    .find({})
    .toArray();

  return games;
}

async function getGameById(id) {
  const connectiondb = await conn.getConnection();
  const game = await connectiondb
    .db(DATABASE)
    .collection(GAMES)
    .find({ _id: new ObjectID(`${id}`) })
    .toArray();
  return game[0];
}

async function getGameByName(name) {
  const connectiondb = await conn.getConnection();
  const games = await connectiondb
    .db(DATABASE)
    .collection(GAMES)
    .find({})
    .toArray();

  const gamesFilter = games.filter((game) => game.name === name);

  return gamesFilter;
}

async function getGameByPlatform(platform) {
  const connectiondb = await conn.getConnection();
  const games = await connectiondb
    .db(DATABASE)
    .collection(GAMES)
    .find({})
    .toArray();

  const gamesFilter = games.filter(
    (game) => game.platforms[`${platform}`] === true
  );

  return gamesFilter;
}

async function getGameByCategory(category) {
  const connectiondb = await conn.getConnection();
  const games = await connectiondb
    .db(DATABASE)
    .collection(GAMES)
    .find({})
    .toArray();

  const gamesFilter = [];

  games.map((game) =>
    game.categories.map((cat) => {
      if (cat.description === category) {
        gamesFilter.push(game);
      }
    })
  );

  return gamesFilter;
}

async function getGameByGenre(genre) {
  const connectiondb = await conn.getConnection();
  const games = await connectiondb
    .db(DATABASE)
    .collection(GAMES)
    .find({})
    .toArray();

  const gamesFilter = [];

  games.map((game) =>
    game.genres.map((gen) => {
      if (gen.description === genre) {
        gamesFilter.push(game);
      }
    })
  );

  return gamesFilter;
}

async function getGenres() {
  const connectiondb = await conn.getConnection();
  const games = await connectiondb
    .db(DATABASE)
    .collection(GAMES)
    .find({})
    .toArray();

  const genresAux = [];

  games.map((game) =>
    game.genres.map((genre) => {
      if (genresAux.filter((gen) => gen.id === genre.id).length === 0) {
        genresAux.push(genre);
      }
    })
  );

  return genresAux;
}

module.exports = {
  getAllGames,
  getGameByPlatform,
  getGameByCategory,
  getGameByGenre,
  getGameById,
  getGameByName,
  getGenres,
};
