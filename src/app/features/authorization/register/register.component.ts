import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public hide = true;
  public registerForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  public initRegisterForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  public onToggleClickPasswordIcon(): void {
    this.hide = !this.hide;
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('submit: ', this.registerForm.value);
    }
  }
}
