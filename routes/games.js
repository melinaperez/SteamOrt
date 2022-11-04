const express = require("express");
const router = express.Router();
const controller = require("../controllers/games");

router.get("/", async (req, res) => {
  res.json(await controller.getAllGames());
});

router.get("/gamesByPlatform/:platform", async (req, res) => {
  const platform = req.params.platform;
  res.json(await controller.getGameByPlatform(platform));
});

router.get("/gamesByCategory/:category", async (req, res) => {
  const category = req.params.category;
  res.json(await controller.getGameByCategory(category));
});

router.get("/gamesByGenre/:genre", async (req, res) => {
  const genre = req.params.genre;
  res.json(await controller.getGameByGenre(genre));
});

module.exports = router;
