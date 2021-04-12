import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Languages } from 'src/app/core/enums/languages.enum';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.scss'],
})
export class NewWordComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public newWordForm: FormGroup;
  public languages = Object.values(Languages);
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public words: string[] = [];
  public translations: string[] = [];
  public selectedWordId: string;

  constructor(
    private dictionaryService: DictionaryService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.selectedWordId = this.activateRoute.snapshot.paramMap.get('id');
    if (this.selectedWordId) {
      this.getSelectedWord();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public initForm(): void {
    this.newWordForm = new FormGroup({
      language: new FormControl('', Validators.required),
      translateLanguage: new FormControl('', Validators.required),
      word: new FormControl('', [Validators.required]),
      translateWord: new FormControl('', [Validators.required]),
    });
  }

  public addWord(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value && this.words.length < 4) {
      this.words.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  public removeWord(word: string): void {
    const index = this.words.indexOf(word);

    if (index >= 0) {
      this.words.splice(index, 1);
    }
  }

  public addTranslate(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();
    if (value && this.translations.length < 4) {
      this.translations.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  public removeTranslate(translate: string): void {
    const index = this.translations.indexOf(translate);

    if (index >= 0) {
      this.translations.splice(index, 1);
    }
  }

  public resetForm(): void {
    this.newWordForm.reset();
    this.words = [];
    this.translations = [];
  }

  public getSelectedWord(): void {
    this.subscription.add(
      this.dictionaryService.getWordById(this.selectedWordId).subscribe((data) => {
        this.newWordForm.patchValue({
          language: data.language,
          translateLanguage: data.translateLanguage,
        });
        this.words = data.word;
        this.translations = data.translateWord;
      }),
    );
  }

  public onSubmit(): void {
    const submitData = {
      ...this.newWordForm.value,
      word: this.words,
      translateWord: this.translations,
    };
    this.subscription.add(
      this.dictionaryService.createNewWord(submitData).subscribe(() => {
        this.resetForm();
        this.router.navigate(['vocabulary']);
      }),
    );
  }
}
