// Iteration #1
// require("dotenv").config();
// require("./../config/index");

const mongoose = require("mongoose");
// const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

const dronesModel = require("./../models/Drone.model");

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

mongoose
  .connect("mongodb://localhost/lab-express-drones", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((x) => {
    dronesModel
      .deleteMany()
      .then(() => {
        dronesModel.insertMany(drones).then((ok) => console.log("ok"));
      })
      .catch((err) => console.log("err", err));
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
