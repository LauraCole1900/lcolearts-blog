import { Schema, model } from "mongoose";
;
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
const Post = model("Post", postSchema);
export default Post;
