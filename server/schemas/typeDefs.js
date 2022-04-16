"use strict";
const { gql } = require('apollo-server-express');
var typeDefs = gql `
  type User {
    _id: ID!
    userName: String!
    email: String
    password: String!
  }

  # type Book {
  #   bookId: ID!
  #   authors: [String]
  #   description: String
  #   image: String
  #   link: String
  #   title: String!
  # }

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
  }

  type Mutation {
    login(userName: String!, password: String!): Auth
    addUser(userName: String!, email: String!, password: String!): Auth
    # saveBook(bookData: BookInput!): User
    # removeBook(bookId: ID!): User
  }
`;
module.exports = typeDefs;
