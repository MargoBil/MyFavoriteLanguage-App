import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthorizationModule } from '../authorization.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthorizationModule],
  exports: [LoginComponent],
})
export class LoginModule {}
