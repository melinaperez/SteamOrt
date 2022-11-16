var express = require("express");
var router = express.Router();
const controller = require("../controllers/user");

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
    res.status(400).send(error.message);
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
    res.status(401).send(error.message);
  }
});

router.put("/addPurchase", async (req, res) => {
  const email = req.body.email;
  const game = req.body.game; //Si se complica especifica info es por aca

  const purchase = await controller.addPurchase(email, game);

  res.status(200).json(purchase);
});
router.put("/playGame", async (req, res) => {
  const email = req.body.email;
  const gameName = req.body.gameName;

  res.json(await controller.playGame(email, gameName));
});
module.exports = router;
