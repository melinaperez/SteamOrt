var express = require("express");
var router = express.Router();
const controller = require("../controllers/user");
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    const user = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
      purchases: [],
    };

    const result = await controller.addUser(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
    console.log(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await controller.findUser(req.body.email, req.body.password);
    const token = controller.generatedToken(user);

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: error.message });
  }
});

router.put("/addPurchase", auth, async (req, res) => {
  const email = req.body.email;
  const game = req.body.game; //Si se complica especificar info es por aca

  try {
    const purchase = await controller.addPurchase(email, game);

    res.status(200).json(purchase);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/myGames", auth, async (req, res) => {
  try {
    const email = req.headers.email;
    res.json(await controller.myGames(email));
  } catch (error) {
    console.log("Estoy en el catch");
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.put("/playGame", auth, async (req, res) => {
  try {
    const email = req.body.email;
    const gameName = req.body.gameName;

    console.log(email);
    console.log(gameName);

    res.json(await controller.playGame(email, gameName));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = router;
