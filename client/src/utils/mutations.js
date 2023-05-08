import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $username: String!, $email: String!, $password: String!) {
    createUser(name: $name, username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER_GENRE = gql`
  mutation UpdateUser($input: [String!]) {
    updateUser(input: $input) {
      _id
      name
      username
      email
      password
      savedGenres
    }
  }
`;

export const DELETE_USER_GENRE = gql`
  mutation deleteUserGenre($genreId: ID!) {
    deleteUserGenre(genreId: $genreId) {
      _id
      savedGenres
    }
  }
`;
export const UPDATE_USER_INFO = gql`
mutation UpdateUserInfo($id: ID!, $name: String, $username: String, $email: String, $password: String) {
  updateUserInfo(id: $id, name: $name, username: $username, email: $email, password: $password) {
    _id
    name
    username
    email
    password
  }
}
`;

export const GET_USER_PROFILE = gql`
query GetUserProfile($userId: ID!) {
  getUserProfile(id: $userId) {
    id
    name
    username
    email
    savedGenres
  }
}
`;

export const GET_USER_GENRES = gql`
  query GetUserGenres($userId: ID!) {
    getUserGenres(id: $userId)
  }
`;