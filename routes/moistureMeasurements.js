const router = require("express").Router();
let MoistureMeasurement = require("../models/moistureMeasurement.model");

// view all moisture measurements
router.route("/").get((req, res) => {
  MoistureMeasurement.find()
    .then((moistureMeasurements) => res.json(moistureMeasurements))
    .catch((err) => res.status(400).json("Error: " + err));
});

// add new moisture measurement
router.route("/add").post((req, res) => {
  const plantName = req.body.plantName;
  const moistureReading = req.body.moistureReading;
  const date = new Date();

  const newMoistureMeasurement = new MoistureMeasurement({
    plantName,
    moistureReading,
    date,
  });

  newMoistureMeasurement
    .save()
    .then(() => res.json("Moisture reading added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
