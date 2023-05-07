const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date 
    type User {
        _id: ID!
        name: String!
        userName: String!
        email: String!
        password: String!
        savedGenres: [String]
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
        users: [User]
        user: User
        getUserProfile(id: ID!): User
        genre(id:ID!): Genre
        genres: [Genre]
        movie(id:ID!): Movie
        movies: [Movie]
        getMoviesByGenres(genres: [String!]!): [Movie!]
        getUserGenres(id: ID!): [String!]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        createUser(name: String!, userName: String!, email: String!, password: String!): Auth
        updateUser(id: ID!, userName: String, email: String, password: String, preferred_genres: [String], ratings: [RatingInput]): User
        createGenre(name: String!): Genre
        updateGenre(id: ID!, name: String, movies: [ID]): Genre
        createMovie(title: String!, release_year: Int!, genre: ID!, poster_url: String!): Movie
        updateMovie(id: ID!, title: String, release_year: Int, genre: ID, poster_url: String!, ratings: [RatingInput]): Movie
        updateRating(userId: ID!, movieId: ID!, rating: String!): Rating
        login(email: String!, password: String!): Auth
        addFavoriteMovie(userId: ID!, movieId: ID!): User!
        removeFavoriteMovie(userId: ID!, movieId: ID!): User!
        createUserGenre(genreData: genreInput!): User
        deleteUserGenre(genreId: String!): User
        updateUserInfo(userId: ID!, name: String!, userName: String!, password: String!, password: String!): User
    }

    input RatingInput {
        movie_id: ID!
        user_id: ID!
        rating: String!
    }

    input genreInput {
        id: ID!
        name: String!
    }
`

module.exports = typeDefs