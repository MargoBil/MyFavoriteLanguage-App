import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IWord } from 'src/app/core/interfaces/dictionary.interface';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
})
export class WordListComponent implements OnInit {
  @Input() wordList: IWord[];
  @Output() updateWord = new EventEmitter<string>();
  @Output() deleteWord = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public isItemRender(item, array): boolean {
    return array.length > 1 && array.length !== 0 && item !== array[array.length - 1];
  }

  public handlerClickForUpdate(wordId: string): void {
    this.updateWord.emit(wordId);
  }

  public handlerClickForDelete(wordId: string): void {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteWord.emit(wordId);
      }
      return;
    });
  }

  public trackById(index: string, item: any): void {
    return item._id;
  }
}
