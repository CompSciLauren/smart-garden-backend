const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plantSchema = new Schema(
  {
    plantName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
