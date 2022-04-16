const { AuthenticationError } = require("apollo-server-express");
var { User } = require("../models");
const { signToken } = require("../utils/auth");

var resolvers: any = {
  Query: {
    me: async (_: any, __: any, context: any): Promise<any> => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (_: any, args: any) => {
      const user: typeof User = await User.create(args);
      const token: string = signToken(user);

      return { token, user };
    },

    login: async (_: any, args: any) => {
      const user: typeof User = await User.findOne({ userName: args.userName });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw: boolean = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token: string = signToken(user);
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
