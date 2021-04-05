import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  private token: string = localStorage.getItem('token');
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      const request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return next.handle(request);
    }
    return next.handle(req);
  }
}
