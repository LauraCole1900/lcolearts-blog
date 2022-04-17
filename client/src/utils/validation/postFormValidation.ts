import { Post } from "../interfaces";

interface PostErrors {
  postTitle: string,
  postBody: string,
  postKeywords: string
}

const postValidate = (post: Post): PostErrors => {
  let errors: PostErrors = {
    postTitle: "",
    postBody: "",
    postKeywords: ""
  };

  // type errors
  if (!post.postTitle) {
    errors.postTitle = "What is the name of your post?";
  }

  // content errors
  if (!post.postBody) {
    errors.postBody = "You must enter content for this post!";
  }

  if (!post.postKeywords) {
    errors.postKeywords = "Please enter tags so this post can be found."
  }

  return errors;
};

export default postValidate;
