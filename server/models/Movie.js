const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      movieId: {
        type: String,
        required: true,
      },
      genre: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Genre',
        required: true
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
      ratings: [
        {
          user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
          rating: { type: String, enum: ['like', 'dislike', 'indifferent'] },
        },
      ],
  });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
