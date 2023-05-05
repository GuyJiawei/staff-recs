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

export const CREATE_USER_GENRE = gql`
  mutation createUserGenre($genreData: String!) {
    createUserGenre(genreData: $genreData) {
      _id
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
mutation UpdateUserInfo($id: ID!, $name: String, $userName: String, $email: String, $password: String) {
  updateUserInfo(id: $id, name: $name, userName: $userName, email: $email, password: $password) {
    _id
    name
    userName
    email
    password
  }
}
`;
