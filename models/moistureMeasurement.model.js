const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moistureMeasurementSchema = new Schema(
  {
    plantName: {
      type: String,
      required: true,
    },
    moistureReading: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MoistureMeasurement = mongoose.model(
  "MoistureMeasurement",
  moistureMeasurementSchema
);

module.exports = MoistureMeasurement;
