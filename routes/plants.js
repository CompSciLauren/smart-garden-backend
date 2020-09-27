const router = require("express").Router();
let Plant = require("../models/plant.model");

router.route("/").get((req, res) => {
  Plant.find()
    .then((plants) => res.json(plants))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const plantName = req.body.plantName;

  const newPlant = new Plant({ plantName });

  newPlant
    .save()
    .then(() => res.json("Plant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
