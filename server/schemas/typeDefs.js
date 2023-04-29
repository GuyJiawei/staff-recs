const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
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
        getUser(id: ID!): User
        getUsers: [User]
        getGenre(id:ID!): Genre
        getGenres: [Genre]
        getMovie(id:ID!): Movie
        getMovies: [Movie]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        updateUser(id: ID!, username: String, email: String, password: String, preferred_genres: [String], ratings: [RatingInput]): User
        createGenre(name: String!): Genre
        updateGenre(id: ID!, name: String, movies: [ID]): Genre
        createMovie(title: String!, release_year: Int!, genre: ID!, poster_url: String!): Movie
        updateMovie(id: ID!, title: String, release_year: Int, genre: ID, poster_url: String!, ratings: [RatingInput]): Movie
    }

    input RatingInput {
        movie_id: ID!
        user_id: ID!
        rating: String!
    }
`

module.exports = typeDefs