import { gql } from "@apollo/client";

export const CREATE_ENTRY = gql`
mutation createEntry($postTitle: String!, $postBody: String!, $postKeywords: [String!]) {
  createEntry(postTitle: $postTitle, postBody: $postBody, postKeywords: $postKeywords) {
    _id
    postTitle
    postBody
    postKeywords
  }
}
`;

export const DELETE_ENTRY = gql`
  mutation deleteEntry($id: ID!) {
    deleteEntry(_id: $id) {
      _id
      postTitle
      postBody
      postKeywords
    }
  }
`;

export const EDIT_ENTRY = gql`
  mutation editEntry($id: ID!, $postTitle: String!, $postBody: String!, $postKeywords: [String!]) {
    editEntry(_id: $id, postTitle: $postTitle, postBody: $postBody, postKeywords: $postKeywords) {
      _id
      postTitle
      postBody
      postKeywords
    }
  }
`;

export const LOG_ME_IN = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;