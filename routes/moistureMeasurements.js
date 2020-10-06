const router = require("express").Router();
let MoistureMeasurement = require("../models/moistureMeasurement.model");

// view all moisture measurements
router.route("/").get((req, res) => {
  MoistureMeasurement.find()
    .then((moistureMeasurements) => res.json(moistureMeasurements))
    .catch((err) => res.status(400).json("Error: " + err));
});

// view all moisture measurements for a specific plant
router.route("/:plantName").get((req, res) => {
  MoistureMeasurement.find({ plantName: req.params.plantName })
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

// view specific moisture measurement
router.route("/:id").get((req, res) => {
  MoistureMeasurement.findById(req.params.id)
    .then((moistureMeasurement) => res.json(moistureMeasurement))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete a specific moisture measurement
router.route("/:id").delete((req, res) => {
  MoistureMeasurement.findByIdAndDelete(req.params.id)
    .then(() => res.json("Moisture measurement deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// edit a specific moisture measurement
router.route("/edit/:id").post((req, res) => {
  MoistureMeasurement.findById(req.params.id)
    .then((moistureMeasurement) => {
      moistureMeasurement.plantName = req.body.plantName;
      moistureMeasurement.moistureReading = req.body.moistureReading;
      moistureMeasurement.date = Date.parse(req.body.date);
      moistureMeasurement
        .save()
        .then(() => res.json("Moisture reading updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
