const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const genreSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    movies: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    ],
});

const Genre = mongoose.model('Genre', genreSchema);
  
module.exports = Genre;