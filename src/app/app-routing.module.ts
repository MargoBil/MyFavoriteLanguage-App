import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/authorization/login/login.component';
import { RegisterComponent } from './features/authorization/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { VocabularyComponent } from './features/vocabulary/vocabulary.component';
import { NewWordComponent } from './features/new-word/new-word.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'vocabulary',
        component: VocabularyComponent,
      },
      {
        path: 'new-word',
        component: NewWordComponent,
      },
      {
        path: 'new-word/:id',
        component: NewWordComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
