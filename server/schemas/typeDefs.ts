var typeDefs: any = `#graphql
  type Post {
    _id: ID!
    postTitle: String!
    postBody: String!
    postKeywords: [String!]
    postDate: String
  }

  type Song {
    _id: ID!
    songTitle: String!
    songVoicing: String!
    songAccompaniment: String!
    songMajorWork: Boolean
    songMvmtNames: [String!]
    songMvmtTracks: [String!]
    songMvmtPreviews: [String!]
    songSacred: Boolean!
    songLiturgy: String
    songTrack: String
    songVideo: String
    songPreview: String
    songYear: String
    songOtherVerName: [String]
    songOtherVerId: [ID]
    songNotes: String
  }

  type User {
    _id: ID!
    userName: String!
    email: String
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getAllEntries: [Post]
    getEntry(_id: ID!): Post
    getAllSongs: [Song]
    getSong(_id: ID!): Song
    getSongsByAcc(songAccompaniment: String!): [Song]
    getSongsByLiturgy(songLiturgy: String!): [Song]
    getSongsByMajorWork(songMajorWork: Boolean): [Song]
    getSongsBySacred(songSacred: Boolean!): [Song]
    getSongsByTitle(songTitle: String!): [Song]
    getSongsByVoicing(songVoicing: String!): [Song]
  }

  type Mutation {
    login(userName: String!, password: String!): Auth
    addUser(userName: String!, email: String!, password: String!): Auth
    createEntry(postTitle: String!, postBody: String!, postKeywords: [String!]): Post
    deleteEntry(_id: ID!): Post
    editEntry(_id: ID!, postTitle: String!, postBody: String!, postKeywords: [String!]): Post
    createSong(songTitle: String!, songVoicing: String!, songAccompaniment: String!, songMajorWork: Boolean, songMvmtNames: [String!], songMvmtTracks: [String!], songMvmtPreviews: [String!], songSacred: Boolean!, songLiturgy: String, songTrack: String, songVideo: String, songPreview: String, songYear: String, songOtherVerName: [String], songOtherVerId: [ID], songNotes: String): Song
    deleteSong(_id: ID!): Song
    editSong(_id: ID!, songTitle: String!, songVoicing: String!, songAccompaniment: String!, songMajorWork: Boolean, songMvmtNames: [String!], songMvmtTracks: [String!], songMvmtPreviews: [String!], songSacred: Boolean!, songLiturgy: String, songTrack: String, songVideo: String, songPreview: String, songYear: String, songOtherVerName: [String], songOtherVerId: [ID] songNotes: String): Song
  }
`;

export default typeDefs;