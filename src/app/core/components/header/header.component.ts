import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userName: string;
  public currentUrl: string;
  public showUserMenu: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        this.currentUrl = data.urlAfterRedirects;
        this.showUserMenu = this.checkRouterUrl(this.currentUrl);
        if (this.showUserMenu) {
          this.authService.getCurrentUser().subscribe(({ name }) => {
            this.userName = name;
          });
        }
      });
  }

  public handlerClickOnLogoutIcon(): void {
    this.onRemoveToken();
    this.router.navigate(['login']);
  }

  private onRemoveToken(): void {
    localStorage.clear();
  }

  private checkRouterUrl(currentUrl): boolean {
    const routerConfig = [];
    this.router.config.map((item) => {
      if (item.children) {
        item.children.map((e) => routerConfig.push(`/${e.path}`));
      }
      return routerConfig.push(`/${item.path}`);
    });
    return [
      ...new Set(routerConfig.filter((item) => item !== '/login' && item !== '/register')),
    ].includes(currentUrl);
  }
}
