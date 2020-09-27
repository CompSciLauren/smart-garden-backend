const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// plant being tracked
const myPlantName = "Zebra Plant";

// read data from sensor
const serialPort = new SerialPort("COM3");
const parser = serialPort.pipe(new Readline({ delimiter: "\r\n" }));

let shouldCaptureData = false;

parser.on("data", (data) => {
  if (shouldCaptureData) {
    console.log("Saving data", data);

    const dataObject = {
      plantName: myPlantName,
      moistureReading: data.toString(),
    };

    axios
      .post("http://localhost:5000/moistureMeasurements/add", dataObject)
      .then((res) => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      });
    shouldCaptureData = false;
  }
});

let minutes = 10;
let interval = minutes * 60 * 1000;

setInterval(() => {
  shouldCaptureData = true;
}, interval);

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// add routers
const usersRouter = require("./routes/users");
const plantsRouter = require("./routes/plants");
const moistureMeasurementsRouter = require("./routes/moistureMeasurements");
app.use("/users", usersRouter);
app.use("/plants", plantsRouter);
app.use("/moistureMeasurements", moistureMeasurementsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
