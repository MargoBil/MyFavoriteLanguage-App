import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public subscription: Subscription = new Subscription();
  public hide = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuthorization();
    this.initRegisterForm();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      this.subscription.add(
        this.authService.onRegister(this.registerForm.value).subscribe(() => {
          this.router.navigate(['login']);
        }),
      );
    }
  }

  private checkAuthorization(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['vocabulary']);
    }
  }
}
