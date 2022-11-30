const { AuthenticationError } = require("@apollo/server/express4");
var { Post, Song, User } = require("../models");
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

    getAllEntries: async (): Promise<any> => {
      return await Post.find({});
    },

    getEntry: async (_: any, args: any): Promise<any> => {
      return await Post.findOne({ _id: args._id });
    },

    getAllSongs: async (): Promise<any> => {
      return await Song.find({});
    },

    getSong: async (_: any, args: any): Promise<any> => {
      return await Song.findOne({ _id: args._id });
    },

    getSongsByAcc: async (_: any, args: any): Promise<any> => {
      return await Song.find({ songAccompaniment: args.songAccompaniment })
        .sort({ songTitle: 1 })
        .exec();
    },

    getSongsByLiturgy: async (_: any, args: any): Promise<any> => {
      return await Song.find({ songLiturgy: args.songLiturgy })
        .sort({ songTitle: 1 })
        .exec();
    },

    getSongsByMajorWork: async (_: any, args: any): Promise<any> => {
      return await Song.find({ songMajorWork: args.songMajorWork === true});
    },

    getSongsBySacred: async (_: any, args: any): Promise<any> => {
      return await Song.find({ songSacred: args.songSacred })
        .sort({ songTitle: 1 })
        .exec();
    },

    getSongsByTitle: async (_: any, args: any): Promise<any> => {
      return await Song.find({ songTitle: args.songTitle })
        .sort({ songTitle: 1 })
        .exec();
    },

    getSongsByVoicing: async (_: any, args: any): Promise<any> => {
      return await Song.find({ songVoicing: args.songVoicing })
        .sort({ songTitle: 1 })
        .exec();
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

    createEntry: async (_: any, args: any): Promise<any> => {
      const post = await Post.create(args);
      return post;
    },

    deleteEntry: async (_: any, args: any): Promise<any> => {
      const post = await Post.findByIdAndDelete({ _id: args._id });
      return post;
    },

    editEntry: async (_: any, args: any): Promise<any> => {
      const post = await Post.findByIdAndUpdate(
        { _id: args._id },
        { $set: { ...args } },
        { new: true }
      );
      return post;
    },

    createSong: async (_: any, args: any): Promise<any> => {
      const song = await Song.create(args);
      return song;
    },

    deleteSong: async (_: any, args: any): Promise<any> => {
      const song = await Song.findByIdAndDelete({ _id: args._id });
      return song;
    },

    editSong: async (_: any, args: any): Promise<any> => {
      const song = await Song.findByIdAndUpdate(
        { _id: args._id },
        { $set: { ...args } },
        { new: true }
      );
      return song;
    },
  },
};

module.exports = resolvers;
