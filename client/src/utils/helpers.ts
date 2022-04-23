import { Post } from "./interfaces";

export const handleTags = (tag: string, posts: Post[]): Post[] => {
  const filteredPosts: Post[] = posts.filter((post: Post): boolean => post.postKeywords.includes(tag));
  const sortedPosts: Post[] = filteredPosts.sort((a: Post, b: Post): 1 | -1 => (a.postDate! < b.postDate!) ? 1 : -1)
  return sortedPosts;
};
