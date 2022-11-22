import { Song } from "../interfaces";

interface SongErrors {
  songTitle: string;
  songVoicing: string;
  songAccompaniment: string;
  songSacred: string;
  songLiturgy: string;
  songTrack: string;
  songPreview: string;
}

const songValidate = (song: Song): SongErrors => {
  let errors: SongErrors = {
    songTitle: "",
    songVoicing: "",
    songAccompaniment: "",
    songSacred: "",
    songLiturgy: "",
    songTrack: "",
    songPreview: ""
  };

  // type errors
  if (!song.songTitle) {
    errors.songTitle = "What is the title of this song?";
  }

  // content errors
  if (!song.songVoicing) {
    errors.songVoicing = "What is the voicing for this song?";
  }

  if (!song.songAccompaniment) {
    errors.songAccompaniment = "What are the available accompaniment(s) for this song";
  }

  if (!song.songSacred) {
    errors.songSacred = "Is this song sacred or secular?"
  }

  if (!song.songTrack) {
    errors.songTrack = "What is the URL for the demo track?"
  }

  if (!song.songPreview) {
    errors.songPreview = "What is the URL for the preview page(s)?"
  }

  return errors;
};

export default songValidate;
