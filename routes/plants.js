const router = require("express").Router();
let Plant = require("../models/plant.model");

// view all plants
router.route("/").get((req, res) => {
  Plant.find()
    .then((plants) => res.json(plants))
    .catch((err) => res.status(400).json("Error: " + err));
});

// view all plants for a specific user
router.route("/:username").get((req, res) => {
  Plant.find({ username: req.params.username })
    .then((plants) => res.json(plants))
    .catch((err) => res.status(400).json("Error: " + err));
});

// add new plant
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const plantName = req.body.plantName;

  const newPlant = new Plant({ username, plantName });

  newPlant
    .save()
    .then(() => res.json("Plant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
