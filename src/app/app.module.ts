import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './core/components/header/header.module';
import { FooterModule } from './core/components/footer/footer.module';
import { RegisterModule } from './features/authorization/register/register.module';
import { HomeModule } from './features/home/home.module';
import { AuthorizationModule } from './features/authorization/authorization.module';
import { LoginModule } from './features/authorization/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundModule } from './features/not-found/not-found.module';
import { VocabularyModule } from './features/vocabulary/vocabulary.module';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    AuthorizationModule,
    RegisterModule,
    LoginModule,
    HttpClientModule,
    NotFoundModule,
    VocabularyModule,
  ],
  providers: [INTERCEPTOR_PROVIDER, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
