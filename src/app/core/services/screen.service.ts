import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  constructor() {
    window.addEventListener('resize', () => {
      this.onResize.next();
    });
  }

  public onResize = new Subject();
}
