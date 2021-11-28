"use strict";
const { AuthenticationError } = require('apollo-server-express');
var { User } = require('../models');
const { signToken } = require('../utils/auth');
var resolvers = {
    Query: {
        me: async (_, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        // saveBook: async (_: any, { bookData }, context) => {
        //   if (context.user) {
        //     const updatedUser = await User.findByIdAndUpdate(
        //       { _id: context.user._id },
        //       { $push: { savedBooks: bookData } },
        //       { new: true }
        //     );
        //     return updatedUser;
        //   }
        //   throw new AuthenticationError('You need to be logged in!');
        // },
        // removeBook: async (parent, { bookId }, context) => {
        //   if (context.user) {
        //     const updatedUser = await User.findOneAndUpdate(
        //       { _id: context.user._id },
        //       { $pull: { savedBooks: { bookId } } },
        //       { new: true }
        //     );
        //     return updatedUser;
        //   }
        //   throw new AuthenticationError('You need to be logged in!');
        // },
    },
};
module.exports = resolvers;
