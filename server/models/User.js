const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    preferred_genres: {
        type: [String],
        default: [],
    },
    ratings: [
      {
        movie_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
        rating: { type: String, enum: ['like', 'dislike', 'indifferent'] },
      },
    ],
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
const User = mongoose.model('User', userSchema);
  
module.exports = User;