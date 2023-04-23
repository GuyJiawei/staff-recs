const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      genre: {
        type: String,
        required: true,
      },
      releaseDate: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      posterUrl: {
        type: String,
      },
  });

const Movie = model('Movie', movieSchema);

module.exports = Movie;
