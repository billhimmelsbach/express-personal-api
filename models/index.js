var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Ride = require("./ride.js");