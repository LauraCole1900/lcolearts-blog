export interface Post {
  _id: string,
  title: string,
  content: string,
  tags: Array<string>,
  created_At: Date
}

export interface User {
  _id?: string,
  userName: string,
  email?: string,
  password: string
}