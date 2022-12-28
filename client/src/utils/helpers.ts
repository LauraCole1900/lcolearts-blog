import { Song } from "./interfaces";

const removeArticles = (str: string): string | void => {
  const words: string[] = str.split(' ');
  if (words.length <= 1) return str
  if (['A', 'An', 'The'].includes(words[0])) {
    return words.splice(1).join(' ') + ', ' + words[0];
  }
  return str;
}

export const sortAsc = (data: Array<Song>, col: string): Array<Song> => {
  const arrToSort: Array<Song> = [...data];
  const sortedData: Array<Song> = arrToSort.sort((a: Song, b: Song): 1 | -1 => {
    if (col === "songTitle") {
      let aTitle: string | void = removeArticles(a.songTitle);
      let bTitle: string | void = removeArticles(b.songTitle);
      return aTitle > bTitle ? 1 : -1
    } else if (col === "songAccompaniment") {
      let aAcc: string = a.songAccompaniment.toLowerCase();
      let bAcc: string = b.songAccompaniment.toLowerCase();
      return aAcc > bAcc ? 1 : -1
    } else if (col === "songSacred") {
      return a.songSacred > b.songSacred ? -1 : 1;
    } else {
      return a[col]! > b[col]! ? 1 : -1
    }
  });
  return sortedData;
};

export const sortDesc = (data: Array<Song>, col: string): Array<Song> => {
  const arrToSort: Array<Song> = [...data];
  const sortedData: Array<Song> = arrToSort.sort((a: Song, b: Song): -1 | 1 => {
    if (col === "songTitle") {
      let aTitle: string | void = removeArticles(a.songTitle);
      let bTitle: string | void = removeArticles(b.songTitle);
      return aTitle > bTitle ? -1 : 1
    } else if (col === "songAccompaniment") {
      let aAcc: string = a.songAccompaniment.toLowerCase();
      let bAcc: string = b.songAccompaniment.toLowerCase();
      return aAcc > bAcc ? -1 : 1
    } else if (col === "songSacred") {
      return a.songSacred > b.songSacred ? 1 : -1;
    } else {
      return a[col]! > b[col]! ? -1 : 1
    }
  });
  return sortedData;
};