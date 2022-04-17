export interface Post {
  _id?: string,
  postTitle: string,
  postBody: string,
  postKeywords: Array<string>,
  postDate?: Date
}

export interface User {
  _id?: string,
  userName: string,
  email?: string,
  password: string
}