var { Schema, model } = require("mongoose");

const songSchema = new Schema({
  songTitle: {
    type: String,
    required: true
  },
  songVoicing: {
    type: String,
    required: true
  },
  songAccompaniment: {
    type: String,
    required: true
  },
  songMajorWork: {
    type: Boolean,
    default: false
  },
  songMvmtNames: {
    type: [String]
  },
  songMvmtTracks: {
    type: [String]
  },
  songMvmtPreviews: {
    type: [String]
  },
  songSacred: {
    type: Boolean,
    required: true
  },
  songLiturgy: {
    type: String
  },
  songTrack: {
    type: String
  },
  songVideo: {
    type: String
  },
  songPreview: {
    type: String
  },
  songYear: {
    type: String
  },
  songOtherVerName: {
    type: [String]
  },
  songOtherVerUrl: {
    type: [String]
  },
  songNotes: {
    type: String
  }
});

var Song: any = model("Song", songSchema);

module.exports = Song;
