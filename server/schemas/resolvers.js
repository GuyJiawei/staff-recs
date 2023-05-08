const { GraphQLScalarType, Kind } = require("graphql");
const { AuthenticationError } = require('apollo-server-express');
const { User, Movie, Genre } = require('../models');
const { signToken } = require('../utils/auth');

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const resolvers = {

  Date: dateScalar,

  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("User is not logged in");
      }

      const user = context.user;

      const foundUser = await User.findOne({
        _id: user._id,
      });

      if (!foundUser) {
        throw new Error("User not found!");
      }
      return foundUser;
    },
    
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // user and getUser have same functionality

    getUserProfile: async (_, { id }) => {
      const user = await User.findById(id).populate('favoriteMovies');
      return user;
    },

    genres: async () => {
      return Genre.find();
    },
    
    genre: async (parent, { genreId }) => {
      return Genre.findOne({ _id: genreId });
    },

    movies: async () => {
      return Movie.find();
    },

    movie: async (parent, { movieId }) => {
      return Movie.findOne({ _id: movieId });
    },
    getUserGenres: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user.savedGenres;
      } catch (error) {
        console.error('Error fetching user genres:', error);
        throw error;
      }
    }
    // Future Development: Front end API, pass user liked genres in the parameters
  },
  Mutation: {
    createUser: async (parent, { name, userName, email, password }) => {
      // Your FE form needs name, userName, email, password
      const user = await User.create({ name, userName, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    createUserGenre: async (parent, { genreData }, context) => {
      const user = context.user;
      console.log(user);
      try {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $addToSet: { savedGenres: genreData } },
          { new: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error("Something is wrong!");
      }
    },

    deleteUserGenre: async (parent, { genreId }, context) => {
      const user = context.user;
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedGenres: { genreId: genreId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },

    updateUserInfo: async (parent, { id, name, userName, email, password }, context) => {
      const user = await User.findOne({ _id: id });
    
      if (!user) {
        throw new Error("Couldn't find user with this id!");
      }
    
      if (name) {
        user.name = name;
      }
    
      if (userName) {
        user.userName = userName;
      }
    
      if (email) {
        user.email = email;
      }
    
      if (password) {
        user.password = password;
      }
    
      const updatedUser = await user.save();
    
      return updatedUser;
    },

    updateUser: async (_, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          input,
          { new: true, runValidators: true }
        );

        return updatedUser;
    }
    throw new AuthenticationError("You need to be logged in to update user data.");
    },
    
  },
};

  module.exports = resolvers

      // Deprecated
    // updateRating: async (parent, args, { User, Movie, Rating }, info) => {
    //   const { userId, movieId, rating } = args;
  
    //   const user = await User.findById(userId);
    //   if (!user) {
    //     throw new Error('User not found');
    //   }
  
    //   const movie = await Movie.findById(movieId);
    //   if (!movie) {
    //     throw new Error('Movie not found');
    //   }
  
    //   const userRating = await Rating.findOne({
    //     user_id: userId,
    //     movie_id: movieId,
    //   });
  
    //   if (!userRating) {
    //     const newRating = new Rating({
    //       user_id: userId,
    //       movie_id: movieId,
    //       rating,
    //     });
    //     await newRating.save();
    //     user.ratings.push(newRating);
    //     await user.save();
    //     movie.ratings.push(newRating);
    //     await movie.save();
    //     return newRating;
    //   }
  
    //   userRating.rating = rating;
    //   await userRating.save();
    //   return userRating;
    // },
    // Deprecated
    // addFavoriteMovie: async (_, { userId, movieId }) => {
    //   const user = await User.findByIdAndUpdate(
    //     userId,
    //     { $addToSet: { favoriteMovies: movieId } },
    //     { new: true }
    //   ).populate('favoriteMovies');

    //   if (!user) {
    //     throw new Error('User not found');
    //   }

    //   return user;
    // },
    // Deprecated
    // removeFavoriteMovie: async (_, { userId, movieId }) => {
    //   const user = await User.findByIdAndUpdate(
    //     userId,
    //     { $pull: { favoriteMovies: movieId } },
    //     { new: true }
    //   ).populate('favoriteMovies');

    //   if (!user) {
    //     throw new Error('User not found');
    //   }

    //   return user;
    // },


    // Create, Update, Delete 
    // Create genre (Assigning a genre to their profile) User.findOneandUpdate( $addToSet ) DONE
    // Delete genre (Remove a genre from the user's profile) DONE
    // Update User (Only update email/password/username)
    // seed/bulk create from the api to create the genres
    // seed/bulk create from the api to create the movie
    // Do not add to database unless a user has added it to their favorites