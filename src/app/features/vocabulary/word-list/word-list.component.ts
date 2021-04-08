import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/dictionary.interface';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
})
export class WordListComponent implements OnInit {
  @Input() wordList: IWord[];
  @Output() updateWord = new EventEmitter<string>();
  @Output() deleteWord = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public isItemRender(item, array): boolean {
    return array.length > 1 && array.length !== 0 && item !== array[array.length - 1];
  }

  public handlerClickForUpdate(wordId: string): void {
    this.updateWord.emit(wordId);
  }

  public handlerClickForDelete(wordId: string): void {
    this.deleteWord.emit(wordId);
  }

  public trackById(index: string, item: any): void {
    return item._id;
  }
}
