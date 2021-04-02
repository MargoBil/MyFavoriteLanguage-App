import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hide = true;

  constructor() {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  public initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  public onToggleClickPasswordIcon(): void {
    this.hide = !this.hide;
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('submit: ', this.loginForm.value);
    }
  }
}
