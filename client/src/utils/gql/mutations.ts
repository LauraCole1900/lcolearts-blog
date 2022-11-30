import { gql } from "@apollo/client";

export const CREATE_ENTRY = gql`
  mutation createEntry(
    $postTitle: String!
    $postBody: String!
    $postKeywords: [String!]
  ) {
    createEntry(
      postTitle: $postTitle
      postBody: $postBody
      postKeywords: $postKeywords
    ) {
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
  mutation editEntry(
    $id: ID!
    $postTitle: String!
    $postBody: String!
    $postKeywords: [String!]
  ) {
    editEntry(
      _id: $id
      postTitle: $postTitle
      postBody: $postBody
      postKeywords: $postKeywords
    ) {
      _id
      postTitle
      postBody
      postKeywords
    }
  }
`;

export const CREATE_SONG = gql`
  mutation createSong(
    $songTitle: String!
    $songVoicing: String!
    $songAccompaniment: String!
    $songMajorWork: Boolean
    $songSacred: Boolean!
    $songLiturgy: String
    $songTrack: String
    $songPreview: String
    $songYear: String
  ) {
    createSong(
      songTitle: $songTitle
      songVoicing: $songVoicing
      songAccompaniment: $songAccompaniment
      songMajorWork: $songMajorWork
      songSacred: $songSacred
      songLiturgy: $songLiturgy
      songTrack: $songTrack
      songPreview: $songPreview
      songYear: $songYear
    ) {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songSacred
      songLiturgy
      songTrack
      songPreview
      songYear
    }
  }
`;

export const DELETE_SONG = gql`
  mutation deleteSong($id: ID!) {
    deleteSong(_id: $id) {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songSacred
      songLiturgy
      songTrack
      songPreview
      songYear
    }
  }
`;

export const EDIT_SONG = gql`
  mutation editSong(
    $id: ID!
    $songTitle: String!
    $songVoicing: String!
    $songAccompaniment: String!
    $songMajorWork: Boolean
    $songSacred: Boolean!
    $songLiturgy: String
    $songTrack: String
    $songPreview: String
    $songYear: String
  ) {
    editSong(
      _id: $id
      songTitle: $songTitle
      songVoicing: $songVoicing
      songAccompaniment: $songAccompaniment
      songMajorWork: $songMajorWork
      songSacred: $songSacred
      songLiturgy: $songLiturgy
      songTrack: $songTrack
      songPreview: $songPreview
      songYear: $songYear
    ) {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songSacred
      songLiturgy
      songTrack
      songPreview
      songYear
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
