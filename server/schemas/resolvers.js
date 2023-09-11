var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GraphQLError } from "graphql";
import { Post, Song, User } from "../models";
const { signToken } = require("../utils/auth");
const resolvers = {
    Query: {
        me: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.user) {
                const userData = yield User.findOne({ _id: context.user._id }).select("-__v -password");
                return userData;
            }
            throw new GraphQLError("Not logged in", {
                extensions: { code: "FORBIDDEN" },
            });
        }),
        getAllEntries: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield Post.find({});
        }),
        getEntry: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Post.findOne({ _id: args._id });
        }),
        getAllSongs: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield Song.find({});
        }),
        getSong: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Song.findOne({ _id: args._id });
        }),
        getSongsByAcc: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Song.find({ songAccompaniment: args.songAccompaniment })
                .sort({ songTitle: 1 })
                .exec();
        }),
        getSongsByLiturgy: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Song.find({ songLiturgy: args.songLiturgy })
                .sort({ songTitle: 1 })
                .exec();
        }),
        getSongsByMajorWork: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Song.find({ songMajorWork: args.songMajorWork === true });
        }),
        getSongsBySacred: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Song.find({ songSacred: args.songSacred })
                .sort({ songTitle: 1 })
                .exec();
        }),
        getSongsByTitle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Song.find({ songTitle: args.songTitle })
                .sort({ songTitle: 1 })
                .exec();
        }),
        getSongsByVoicing: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Song.find({ songVoicing: args.songVoicing })
                .sort({ songTitle: 1 })
                .exec();
        }),
    },
    Mutation: {
        addUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User.create(args);
            const token = signToken(user);
            return { token, user };
        }),
        login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User.findOne({ userName: args.userName });
            if (!user) {
                throw new GraphQLError("Incorrect credentials", {
                    extensions: { code: "FORBIDDEN" },
                });
            }
            const correctPw = yield user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw new GraphQLError("Incorrect credentials", {
                    extensions: { code: "FORBIDDEN" },
                });
            }
            const token = signToken(user);
            return { token, user };
        }),
        createEntry: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const post = yield Post.create(args);
            return post;
        }),
        deleteEntry: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const post = yield Post.findByIdAndDelete({ _id: args._id });
            return post;
        }),
        editEntry: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const post = yield Post.findByIdAndUpdate({ _id: args._id }, { $set: Object.assign({}, args) }, { new: true });
            return post;
        }),
        createSong: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const song = yield Song.create(args);
            return song;
        }),
        deleteSong: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const song = yield Song.findByIdAndDelete({ _id: args._id });
            return song;
        }),
        editSong: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const song = yield Song.findByIdAndUpdate({ _id: args._id }, { $set: Object.assign({}, args) }, { new: true });
            return song;
        }),
    },
};
export default resolvers;
