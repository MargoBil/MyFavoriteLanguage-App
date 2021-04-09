import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiLinks } from '../constants';
import { IWord, IWordsData } from '../interfaces/dictionary.interface';
import { ApiService } from './api.service';

const { allWords } = apiLinks;

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private wordsListBehaviorSubject: BehaviorSubject<IWordsData> = new BehaviorSubject<IWordsData>(
    null,
  );
  public wordsList: Observable<IWordsData> = this.wordsListBehaviorSubject.asObservable();

  constructor(private apiService: ApiService) {}

  public getAllWords(query?: string): Observable<IWordsData> {
    return this.apiService.get(`${allWords}/${query || ''}`);
  }

  public deleteWord(wordId: string): Observable<null> {
    return this.apiService.delete(`${allWords}/${wordId}`);
  }

  public updateWord(wordId: string, body: any): Observable<IWordsData> {
    return this.apiService.patch(`${allWords}/${wordId}`, body);
  }
}
