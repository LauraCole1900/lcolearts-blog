export interface Post {
  _id?: string,
  postTitle: string,
  postBody: string,
  postKeywords: Array<string>,
  postDate?: string
}

export interface Song {
  _id?: string,
  songTitle: string,
  songVoicing: string,
  songAccompaniment: string[],
  songSacred: boolean,
  songLiturgy: string,
  songTrack: string,
  songPreview: string
}

export interface User {
  _id?: string,
  userName: string,
  email?: string,
  password: string
}