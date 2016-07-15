var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TripsSchema = new Schema({
  title: String,
  author: {
      type: Schema.Types.ObjectId,
      ref:'Author'
  },
  image: String,
  releaseDate: String
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;
