import { Schema, model } from "mongoose";

interface IPost {
  postTitle: string;
  postBody: string;
  postKeywords?: string[];
  postDate: Date;
};

const postSchema = new Schema<IPost>({
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

const Post = model<IPost>("Post", postSchema);

export default Post;
