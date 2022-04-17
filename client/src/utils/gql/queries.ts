import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me($userName: String!) {
  me(userName: $userName) {
    _id
    userName
  }
}
`;

export const QUERY_ALL_ENTRIES = gql`
query getAllEntries {
  getAllEntries {
    _id
    postTitle
    postBody
    postKeywords
  }
}
`;

export const QUERY_ONE_ENTRY = gql `
query getEntry($id: ID!) {
  getEntry(_id: $id) {
    _id
    postTitle
    postBody
    postKeywords
  }
}
`;