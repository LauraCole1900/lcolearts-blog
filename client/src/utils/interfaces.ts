export interface Post {
  _id?: string,
  postTitle: string,
  postBody: string,
  postKeywords: Array<string>,
  postDate?: string
}

export interface Song {
  [index: string]: string | boolean | Array<string> | undefined,
  _id?: string,
  songTitle: string,
  songVoicing: string,
  songAccompaniment: string,
  songMajorWork: boolean,
  songMvmtNames: Array<string>,
  songMvmtTracks: Array<string>,
  songMvmtPreviews: Array<string>,
  songSacred: boolean,
  songLiturgy: string,
  songTrack: string,
  songVideo: string,
  songPreview: string,
  songYear: string,
  songOtherVerName: Array<string>,
  songOtherVerId: Array<string>,
  songNotes: string
}

export interface SongErrors {
  [index: string]: string,
  
  songTitle: string,
  songVoicing: string,
  songAccompaniment: string,
  songMajorWork: string,
  songSacred: string,
  songLiturgy: string,
  songTrack: string,
  songPreview: string,
  songYear: string
}

export interface User {
  _id?: string,
  userName: string,
  email?: string,
  password: string
}