"use strict";
const { AuthenticationError } = require("@apollo/server/express4");
var { Post, Song, User } = require("../models");
const { signToken } = require("../utils/auth");
var resolvers = {
    Query: {
        me: async (_, __, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
        getAllEntries: async () => {
            return await Post.find({});
        },
        getEntry: async (_, args) => {
            return await Post.findOne({ _id: args._id });
        },
        getAllSongs: async () => {
            return await Song.find({});
        },
        getSong: async (_, args) => {
            return await Song.findOne({ _id: args._id });
        },
        getSongsByAcc: async (_, args) => {
            return await Song.find({ songAccompaniment: args.songAccompaniment })
                .sort({ songTitle: 1 })
                .exec();
        },
        getSongsByLiturgy: async (_, args) => {
            return await Song.find({ songLiturgy: args.songLiturgy })
                .sort({ songTitle: 1 })
                .exec();
        },
        getSongsByMajorWork: async (_, args) => {
            return await Song.find({ songMajorWork: args.songMajorWork === true });
        },
        getSongsBySacred: async (_, args) => {
            return await Song.find({ songSacred: args.songSacred })
                .sort({ songTitle: 1 })
                .exec();
        },
        getSongsByTitle: async (_, args) => {
            return await Song.find({ songTitle: args.songTitle })
                .sort({ songTitle: 1 })
                .exec();
        },
        getSongsByVoicing: async (_, args) => {
            return await Song.find({ songVoicing: args.songVoicing })
                .sort({ songTitle: 1 })
                .exec();
        },
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (_, args) => {
            const user = await User.findOne({ userName: args.userName });
            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user);
            return { token, user };
        },
        createEntry: async (_, args) => {
            const post = await Post.create(args);
            return post;
        },
        deleteEntry: async (_, args) => {
            const post = await Post.findByIdAndDelete({ _id: args._id });
            return post;
        },
        editEntry: async (_, args) => {
            const post = await Post.findByIdAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
            return post;
        },
        createSong: async (_, args) => {
            const song = await Song.create(args);
            return song;
        },
        deleteSong: async (_, args) => {
            const song = await Song.findByIdAndDelete({ _id: args._id });
            return song;
        },
        editSong: async (_, args) => {
            const song = await Song.findByIdAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
            return song;
        },
    },
};
module.exports = resolvers;
