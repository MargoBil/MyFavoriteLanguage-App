import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Languages } from 'src/app/core/enums/languages.enum';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.scss'],
})
export class NewWordComponent implements OnInit {
  public newWordForm: FormGroup;
  public languages = Object.values(Languages);

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.newWordForm = new FormGroup({
      language: new FormControl('', Validators.required),
      translateLanguage: new FormControl('', Validators.required),
      // word: new FormControl(''),
      // translateWord: new FormControl('')
    });
  }

  public onSubmit(): void {
    console.log(this.newWordForm.value);
  }
}
