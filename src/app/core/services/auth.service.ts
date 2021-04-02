import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginReqBody, IRegisterReqBody } from '../interfaces/auth.interfaces';
import { ApiService } from './api.service';
import { apiLinks } from '../constants';
import { tap } from 'rxjs/operators';

const { register, login } = apiLinks;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  public onRegister(body: IRegisterReqBody): Observable<null> {
    return this.apiService.post(register, JSON.stringify(body));
  }

  public onLogin(body: ILoginReqBody): Observable<any> {
    return this.apiService.post(login, JSON.stringify(body)).pipe(
      tap(({ token }) => {
        localStorage.setItem('token', token);
      }),
    );
  }
}
