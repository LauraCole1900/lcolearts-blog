import { Song } from "./interfaces";

export const sortAsc = (data: Array<Song>, col: string): Array<Song> => {
  const arrToSort: Array<Song> = [ ...data ];
  const sortedData: Array<Song> = arrToSort.sort((a: Song, b: Song): 1 | -1 => a[col]! > b[col]! ? 1 : -1);
  return sortedData;
};

export const sortDesc = (data: Array<Song>, col: string): Array<Song> => {
  const arrToSort: Array<Song> = [ ...data ];
  const sortedData: Array<Song> = arrToSort.sort((a: Song, b: Song): 1 | -1 => a[col]! > b[col]! ? -1 : 1);
  return sortedData;
};