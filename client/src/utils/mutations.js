import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($userName: String!,$email: String!, $password: String!) {
    login(userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const GET_MOVIES_BY_GENRES = gql`
  query GetMoviesByGenres($genres: [String!]!) {
    getMoviesByGenres(genres: $genres) {
      id
      title
      genre
      releaseDate
      description
      posterUrl
    }
  }
`;