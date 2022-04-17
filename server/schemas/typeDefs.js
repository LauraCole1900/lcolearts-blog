"use strict";
const { gql } = require('apollo-server-express');
var typeDefs = gql `
  type User {
    _id: ID!
    userName: String!
    email: String
    password: String!
  }

  type Post {
    _id: ID!
    postTitle: String!
    postBody: String!
    postKeywords: [String!]
    postDate: String
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
  }

  type Mutation {
    login(userName: String!, password: String!): Auth
    addUser(userName: String!, email: String!, password: String!): Auth
    createEntry(postTitle: String!, postBody: String!, postKeywords: [String!]): Post
    deleteEntry(_id: ID!): Post
    editEntry(_id: ID!, postTitle: String!, postBody: String!, postKeywords: [String!]): Post
  }
`;
module.exports = typeDefs;
