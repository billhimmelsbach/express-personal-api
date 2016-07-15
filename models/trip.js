var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TripSchema = new Schema({
  title: String,
  image: String,
  releaseDate: String
});

// author: {
//     type: Schema.Types.ObjectId,
//     ref:'Author'
// },

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
