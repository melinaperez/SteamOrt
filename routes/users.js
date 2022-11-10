var express = require("express");
var router = express.Router();
const controller = require("../controllers/user");

router.post("/register", async (req, res) => {
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

router.post("/addPurchase", async (req, res) => {
  const email = req.body.email;
  const game = req.body.game; //Si se complica especifica info es por aca
  const purchase = await controller.addPurchase(email, game);

  res.status(200).json(purchase);
});
module.exports = router;
