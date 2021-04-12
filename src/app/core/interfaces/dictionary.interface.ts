export interface IWordsData {
  total: number;
  data: IWord[];
}

export interface IWord {
  language: string;
  translateLanguage: string;
  translateWord: Array<string>;
  word: Array<string>;
  data: string;
}
