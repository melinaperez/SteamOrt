const games = require("../data/games");

async function getAllGames() {
  return games.getAllGames();
}

async function getGameByPlatform(platform) {
  return games.getGameByPlatform(platform);
}

async function getGameByCategory(category) {
  return games.getGameByCategory(category);
}

async function getGameByGenre(genre) {
  return games.getGameByGenre(genre);
}
async function getGameById(id) {
  return games.getGameById(id);
}

async function getGameByName(name) {
  return games.getGameByName(name);
}

async function getGenres() {
  return games.getGenres();
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
