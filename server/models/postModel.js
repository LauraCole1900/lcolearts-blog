"use strict";
var { Schema, model } = require("mongoose");
const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postBody: {
        type: String,
        required: true,
    },
    postKeywords: {
        type: [String],
    },
    postDate: {
        type: Date,
        default: Date.now,
    },
});
var Post = model("Post", postSchema);
module.exports = Post;
