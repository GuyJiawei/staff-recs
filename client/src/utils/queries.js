import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      userName
      email
      savedGenres {
        genreId
        name
      }
      }
    }
`;