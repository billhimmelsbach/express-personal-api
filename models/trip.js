var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TripSchema = new Schema({
  title: String,
  location: String,
  image: String,
  pullQuote: String,
  summary: String,
  tripTime: String,
  postTime: String,
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
