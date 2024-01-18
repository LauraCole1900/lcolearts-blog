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
  bTitle: string
): 1 | -1 => {
  if (a === b) {
    return aTitle > bTitle ? 1 : -1;
  } else {
    return a! > b! ? 1 : -1;
  }
};

export const sortAsc = (data: Array<Song>, col: string): Array<Song> => {
  const arrToSort: Array<Song> = [...data];
  const sortedData: Array<Song> = arrToSort.sort((a: Song, b: Song): 1 | -1 => {
    let aTitle: string | void = removeArticles(a.songTitle);
    let bTitle: string | void = removeArticles(b.songTitle);
    if (col === "songTitle") {
      return aTitle > bTitle ? 1 : -1;
    } else if (col === "songAccompaniment") {
      let aAcc: string = a.songAccompaniment.toLowerCase();
      let bAcc: string = b.songAccompaniment.toLowerCase();
      return compare(aAcc, bAcc, aTitle!, bTitle!);
    } else if (col === "songSacred") {
      return compare(b.songSacred, a.songSacred, aTitle!, bTitle!);
    } else {
      return compare(a[col], b[col], aTitle!, bTitle!);
    }
  });
  return sortedData;
};

// const sortedPres = moreFilteredPres.sort(
//   firstBy("presKeynote", "desc")
//     .thenBy("presFamilyName")
//     .thenBy("presGivenName")
// );

export const sortDesc = (data: Array<Song>, col: string): Array<Song> => {
  const arrToSort: Array<Song> = [...data];
  const sortedData: Array<Song> = arrToSort.sort((a: Song, b: Song): -1 | 1 => {
    if (col === "songTitle") {
      let aTitle: string | void = removeArticles(a.songTitle);
      let bTitle: string | void = removeArticles(b.songTitle);
      return aTitle > bTitle ? -1 : 1;
    } else if (col === "songAccompaniment") {
      let aAcc: string = a.songAccompaniment.toLowerCase();
      let bAcc: string = b.songAccompaniment.toLowerCase();
      return aAcc > bAcc ? -1 : 1;
    } else if (col === "songSacred") {
      return a.songSacred > b.songSacred ? 1 : -1;
    } else {
      return a[col]! > b[col]! ? -1 : 1;
    }
  });
  return sortedData;
};
