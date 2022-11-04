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

module.exports = {
  getAllGames,
  getGameByPlatform,
  getGameByCategory,
  getGameByGenre,
};
