import { Song, SongErrors } from "../interfaces";

export const songValidate = (song: Song): SongErrors => {
  let errors: SongErrors = {
    songTitle: "",
    songVoicing: "",
    songAccompaniment: "",
    songSacred: "",
    songLiturgy: "",
    songTrack: "",
    songPreview: ""
  };

  // title errors
  if (!song.songTitle) {
    errors.songTitle = "What is the title of this song?";
  }

  // voicing errors
  if (!song.songVoicing) {
    errors.songVoicing = "What is the voicing for this song?";
  }

  // Accompaniment errors
  if (!song.songAccompaniment) {
    errors.songAccompaniment = "What are the available accompaniment(s) for this song";
  }

  // Sacred/Secular errors
  if (!song.songSacred) {
    errors.songSacred = "Is this song sacred or secular?"
  }

  // Demo track errors
  if (!song.songTrack) {
    errors.songTrack = "What is the URL for the demo track?"
  }

  // Preview link errors
  if (!song.songPreview) {
    errors.songPreview = "What is the URL for the preview page(s)?"
  }

  return errors;
};

export default songValidate;
