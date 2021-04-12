import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.apiService
      .get(`${allWords}/${query || ''}`)
  }

  public getWordById(id?: string): Observable<IWord> {
    return this.apiService
      .get(`${allWords}/${id}`)
  }

  public createNewWord(body: any): Observable<any> {
    return this.apiService.post(allWords, body);
  }

  public deleteWord(wordId: string): Observable<null> {
    return this.apiService.delete(`${allWords}/${wordId}`);
  }

  public updateWord(wordId: string, body: any): Observable<IWordsData> {
    return this.apiService.patch(`${allWords}/${wordId}`, body);
  }
}
