"use strict";
const gql = require('graphql-tag');
var typeDefs = gql `
  type Post {
    _id: ID!
    postTitle: String!
    postBody: String!
    postKeywords: [String!]
    postDate: String
  }

  type Song {
    _id: ID!
    songTitle: String!
    songVoicing: String!
    songAccompaniment: [String!]
    songSacred: Boolean!
    songLiturgy: String
    songMIDI: String
    songPreview: String
  }

  type User {
    _id: ID!
    userName: String!
    email: String
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  # input BookInput {
  #   authors: [String]
  #   description: String!
  #   bookId: String!
  #   image: String
  #   link: String
  #   title: String!
  # }

  type Query {
    me: User
    getAllEntries: [Post]
    getEntry(_id: ID!): Post
    getAllSongs: [Song]
    getSong(_id: ID!): Song
    getSongsByAcc(songAccompaniment: String!): [Song]
    getSongsByLiturgy(songLiturgy: String!): [Song]
    getSongsBySacred(songSacred: Boolean!): [Song]
    getSongsByTitle(songTitle: String!): [Song]
    getSongsByVoicing(songVoicing: String!): [Song]
  }

  type Mutation {
    login(userName: String!, password: String!): Auth
    addUser(userName: String!, email: String!, password: String!): Auth
    createEntry(postTitle: String!, postBody: String!, postKeywords: [String!]): Post
    deleteEntry(_id: ID!): Post
    editEntry(_id: ID!, postTitle: String!, postBody: String!, postKeywords: [String!]): Post
    createSong(songTitle: String!, songVoicing: String!, songAccompaniment: [String!], songSacred: Boolean!, songLiturgy: String, songMIDI: String, songPreview: String): Song
    deleteSong(_id: ID!): Song
    editSong(_id: ID!, songTitle: String!, songVoicing: String!, songAccompaniment: [String!], songSacred: Boolean!, songLiturgy: String, songMIDI: String, songPreview: String): Song
  }
`;
module.exports = typeDefs;
