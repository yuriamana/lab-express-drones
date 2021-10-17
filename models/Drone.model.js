// Iteration #1
// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose")


const droneSchema = new Schema ({
    name: {type: String, required: true},
    propellers: {type: Number, min: 1},
    maxSpeed: {type: Number, min: 0},
});

const dronesModel = model("drones", droneSchema);
module.exports = dronesModel;