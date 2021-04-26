import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/dictionary.interface';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription(null);
  public wordList: IWord[] = [];
  public length: number;
  public pageSize = 5;
  public total = 0;
  public pageIndex = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 50];
  public searcher: FormGroup;
  public wordName: FormControl;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dictionaryService: DictionaryService, private router: Router) {}

  public ngOnInit(): void {
    this.searcher = new FormGroup({
      wordName: (this.wordName = new FormControl('')),
    });
    this.paginator._intl.itemsPerPageLabel = null;
    this.getAllWords(this.pageIndex, this.pageSize);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getAllWords(pageIndex?, pageSize?): void {
    this.subscription.add(
      this.dictionaryService
        .getAllWords(`?page=${pageIndex + 1}&limit=${pageSize}`)
        .subscribe((data) => {
          this.wordList = data.data.sort((a, b) => Date.parse(b.data) - Date.parse(a.data));
          this.total = data.total;
          this.length = data.total;
        }),
    );
  }

  public onPageChanges(event: PageEvent): void {
    if (event.pageIndex !== event.previousPageIndex || this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.getAllWords(event.pageIndex, event.pageSize);
    }
  }

  public updateWord(wordId: string): void {
    this.router.navigate(['new-word', wordId]);
  }

  public deleteWord(wordId: string): void {
    this.subscription.add(
      this.dictionaryService.deleteWord(wordId).subscribe(() => {
        this.getAllWords(this.pageIndex, this.pageSize);
        if (this.wordList.length === 1) {
          this.pageIndex = this.pageIndex - 1;
          this.getAllWords(this.pageIndex, this.pageSize);
        }
      }),
    );
  }

  public onSearchWord(wordName: string): void {
    this.subscription.add(
      this.dictionaryService.getWordByName(wordName).subscribe((data) => {
        this.wordList = data;
      }),
    );
  }

  public onSubmit(): void {
    console.log(this.wordName.value);
    if (this.wordName.value) {
      this.onSearchWord(this.wordName.value);
    } else {
      this.pageIndex = 0;
      this.getAllWords(this.pageIndex, this.pageSize);
    }
  }
}
