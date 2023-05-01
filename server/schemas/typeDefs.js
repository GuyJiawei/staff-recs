const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        userName: String!
        email: String!
        password: String!
        preferred_genres: [String]
        ratings: [Rating]
    }

    type Genre {
        id: ID!
        name: String!
        movies: [Movie]
    }

    type Movie {
        movieId: ID!
        title: String!
        genre: Genre
        releaseDate: Date!
        description: String!
        posterUrl: String
        ratings: [Rating]
    }

    type Rating {
        movie_id: ID!
        user_id: ID!
        rating: String!
    }

    type Query {
        me: User
        getUserProfile(id: ID!): User
        getUsers: [User]
        getGenre(id:ID!): Genre
        getGenres: [Genre]
        getMovie(id:ID!): Movie
        getMovies: [Movie]
        getMoviesByGenres(genres: [String!]!): [Movie!]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        updateUser(id: ID!, username: String, email: String, password: String, preferred_genres: [String], ratings: [RatingInput]): User
        createGenre(name: String!): Genre
        updateGenre(id: ID!, name: String, movies: [ID]): Genre
        createMovie(title: String!, release_year: Int!, genre: ID!, poster_url: String!): Movie
        updateMovie(id: ID!, title: String, release_year: Int, genre: ID, poster_url: String!, ratings: [RatingInput]): Movie
        updateRating(userId: ID!, movieId: ID!, rating: String!): Rating
        login(email: String!, password: String!): Auth
        addFavoriteMovie(userId: ID!, movieId: ID!): User!
        removeFavoriteMovie(userId: ID!, movieId: ID!): User!
    }

    input RatingInput {
        movie_id: ID!
        user_id: ID!
        rating: String!
    }
`

module.exports = typeDefs