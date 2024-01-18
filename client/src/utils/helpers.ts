import { Song } from "./interfaces";

const removeArticles = (str: string): string | void => {
  const words: string[] = str.split(" ");
  if (words.length <= 1) return str;
  if (["A", "An", "The"].includes(words[0])) {
    return words.splice(1).join(" ") + ", " + words[0];
  }
  return str;
};

const compare = (
  a: string | boolean | Array<string> | undefined,
  b: string | boolean | Array<string> | undefined,
  aTitle: string,
  bTitle: string,
  dir: string
): 1 | -1 => {
  console.log(a, b);
  if (dir === "asc") {
    if (a === b) {
      return aTitle > bTitle ? 1 : -1;
    } else {
      return a! > b! ? 1 : -1;
    }
  } else if (dir === "dsc") {
    if (a === b) {
      return aTitle > bTitle ? 1 : -1;
    } else {
      return a! > b! ? -1 : 1;
    }
  }
};

export const sortAsc = (data: Array<Song>, col: string): Array<Song> => {
  const arrToSort: Array<Song> = [...data];
  const sortedData: Array<Song> = arrToSort.sort((a: Song, b: Song): 1 | -1 => {
    let aTitle: string | void = removeArticles(a.songTitle);
    let bTitle: string | void = removeArticles(b.songTitle);
    // let aVoicing: string | void = a.songVoicing;
    // let bVoicing: string | void = b.songVoicing;
    if (col === "songTitle") {
      return aTitle > bTitle ? 1 : -1;
    } else if (col === "songAccompaniment") {
      let aAcc: string = a.songAccompaniment.toLowerCase();
      let bAcc: string = b.songAccompaniment.toLowerCase();
      return compare(aAcc, bAcc, aTitle!, bTitle!, "asc");
    } else if (col === "songSacred") {
      return compare(b.songSacred, a.songSacred, aTitle!, bTitle!, "asc");
    } else {
      return compare(a[col], b[col], aTitle!, bTitle!, "asc");
    }
  });
  return sortedData;
};

export const sortDesc = (data: Array<Song>, col: string): Array<Song> => {
  const arrToSort: Array<Song> = [...data];
  const sortedData: Array<Song> = arrToSort.sort((a: Song, b: Song): -1 | 1 => {
    let aTitle: string | void = removeArticles(a.songTitle);
    let bTitle: string | void = removeArticles(b.songTitle);
    if (col === "songTitle") {
      return aTitle > bTitle ? 1 : -1;
    } else if (col === "songAccompaniment") {
      let aAcc: string = a.songAccompaniment.toLowerCase();
      let bAcc: string = b.songAccompaniment.toLowerCase();
      return compare(aAcc, bAcc, aTitle!, bTitle!, "dsc");
    } else if (col === "songSacred") {
      return compare(b.songSacred, a.songSacred, aTitle!, bTitle!, "dsc");
    } else {
      return compare(a[col], b[col], aTitle!, bTitle!, "dsc");
    }
  });
  return sortedData;
};
