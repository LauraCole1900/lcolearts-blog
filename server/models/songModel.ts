import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface ISong {
  songTitle: string;
  songVoicing: string;
  songAccompaniment: string;
  songMajorWork: Boolean;
  songMvmtNames?: string[];
  songMvmtTracks?: string[];
  songMvmtPreviews?: string[];
  songSacred: boolean;
  songLiturgy?: string;
  songTrack?: string;
  songVideo?: string;
  songPreview?: string;
  songYear?: string;
  songOtherVerName?: string[];
  songOtherVerId?: string[];
  songNotes?: string;
};

const songSchema = new Schema<ISong>({
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
  songOtherVerId: {
    type: [String]
  },
  songNotes: {
    type: String
  }
});

var Song = model<ISong>('Song', songSchema);

export default Song;
