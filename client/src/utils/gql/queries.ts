import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      userName
    }
  }
`;

export const QUERY_ALL_ENTRIES = gql`
  query getAllEntries {
    getAllEntries {
      _id
      postTitle
      postBody
      postKeywords
      postDate
    }
  }
`;

export const QUERY_ONE_ENTRY = gql`
  query getEntry($id: ID!) {
    getEntry(_id: $id) {
      _id
      postTitle
      postBody
      postKeywords
      postDate
    }
  }
`;

export const QUERY_ALL_SONGS = gql`
  query getAllSongs {
    getAllSongs {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songMvmtNames
      songMvmtTracks
      songMvmtPreviews
      songSacred
      songLiturgy
      songTrack
      songVideo
      songPreview
      songYear
      songOtherVerName
      songOtherVerId
      songNotes
    }
  }
`;

export const QUERY_ONE_SONG = gql`
  query getSong($id: ID!) {
    getSong(_id: $id) {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songMvmtNames
      songMvmtTracks
      songMvmtPreviews
      songSacred
      songLiturgy
      songTrack
      songVideo
      songPreview
      songYear
      songOtherVerName
      songOtherVerId
      songNotes
    }
  }
`;

export const QUERY_SONGS_BY_ACC = gql`
  query getSongsByAcc {
    getSongsByAcc {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songMvmtNames
      songMvmtTracks
      songMvmtPreviews
      songSacred
      songLiturgy
      songTrack
      songVideo
      songPreview
      songYear
      songOtherVerName
      songOtherVerId
      songNotes
    }
  }
`;

export const QUERY_SONGS_BY_LIT = gql`
  query getSongsByLiturgy {
    getSongsByLiturgy {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songMvmtNames
      songMvmtTracks
      songMvmtPreviews
      songSacred
      songLiturgy
      songTrack
      songVideo
      songPreview
      songYear
      songOtherVerName
      songOtherVerId
      songNotes
    }
  }
`;

export const QUERY_SONGS_BY_MW = gql`
  query getSongsByMW {
    getSongsByMW {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songMvmtNames
      songMvmtTracks
      songMvmtPreviews
      songSacred
      songLiturgy
      songTrack
      songVideo
      songPreview
      songYear
      songOtherVerName
      songOtherVerId
      songNotes
    }
  }
`;

export const QUERY_SONGS_BY_SACRED = gql`
  query getSongsBySacred {
    getSongsBySacred {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songMvmtNames
      songMvmtTracks
      songMvmtPreviews
      songSacred
      songLiturgy
      songTrack
      songVideo
      songPreview
      songYear
      songOtherVerName
      songOtherVerId
      songNotes
    }
  }
`;

export const QUERY_SONGS_BY_TITLE = gql`
  query getSongsByTitle {
    getSongsByTitle {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songMvmtNames
      songMvmtTracks
      songMvmtPreviews
      songSacred
      songLiturgy
      songTrack
      songVideo
      songPreview
      songYear
      songOtherVerName
      songOtherVerId
      songNotes
    }
  }
`;

export const QUERY_SONGS_BY_VOICING = gql`
  query getSongsByVoicing {
    getSongsByVoicing {
      _id
      songTitle
      songVoicing
      songAccompaniment
      songMajorWork
      songMvmtNames
      songMvmtTracks
      songMvmtPreviews
      songSacred
      songLiturgy
      songTrack
      songVideo
      songPreview
      songYear
      songOtherVerName
      songOtherVerId
      songNotes
    }
  }
`;
