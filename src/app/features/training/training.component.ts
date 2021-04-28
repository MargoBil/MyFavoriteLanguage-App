import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/dictionary.interface';
import { DictionaryService } from 'src/app/core/services/dictionary.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription(null);
  public checkForm: FormGroup;
  public vocabulary: IWord[];
  public currentWord: IWord;
  public isWordChecked = null;
  public vocabularyRender = true;
  public loading = false;

  constructor(private dictionaryService: DictionaryService) {}

  public ngOnInit(): void {
    this.loading = true;
    this.checkForm = new FormGroup({
      translation: new FormControl(''),
    });
    this.getVocabulary();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getVocabulary(): void {
    this.subscription.add(
      this.dictionaryService.getAllWords().subscribe(({ data }) => {
        this.vocabulary = data;
        this.randomChangeCurrentWord(this.vocabulary);
        this.loading = false;
      }),
    );
  }

  private randomChangeCurrentWord(list): void {
    this.currentWord = list[Math.floor(Math.random() * list.length)];
  }

  public onSkip(): void {
    this.resetInputValue();
    this.randomChangeCurrentWord(this.vocabulary);
    this.isWordChecked = null;
  }

  private resetInputValue(): void {
    this.checkForm.get('translation').setValue('');
  }

  public onCheckTranslation(): void {
    if (this.checkForm.value.translation) {
      if (this.vocabularyRender) {
        this.isWordChecked = this.currentWord.translateWord.includes(
          this.checkForm.value.translation.toLowerCase(),
        );
      } else {
        this.isWordChecked = this.currentWord.word.includes(
          this.checkForm.value.translation.toLowerCase(),
        );
      }
    }
  }

  public onToggle(): void {
    this.vocabularyRender = !this.vocabularyRender;
    this.resetInputValue();
    this.isWordChecked = null;
  }
}
