import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { AuthorizationModule } from '../authorization.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [AuthorizationModule],
  exports: [RegisterComponent],
})
export class RegisterModule {}
