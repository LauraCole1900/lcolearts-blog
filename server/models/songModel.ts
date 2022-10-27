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
  songMIDI: {
    type: String
  },
  songPreview: {
    type: String
  }
});

var Song: any = model("Song", songSchema);

module.exports = Song;
