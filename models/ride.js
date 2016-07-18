var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RideSchema = new Schema({
	title: String,
	location: String,
	image: String,
	pullQuote: String,
	summary: String,
	rideTime: String,
	postTime: String,
});

var Ride = mongoose.model('Ride', RideSchema);

module.exports = Ride;