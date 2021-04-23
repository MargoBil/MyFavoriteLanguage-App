import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { screenWidth } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription(null);
  public userName: string;
  public currentUrl: string;
  public showUserMenu: boolean;
  public width: number;
  public mobileScreen: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private screenService: ScreenService,
  ) {}

  public ngOnInit(): void {
    this.mobileScreen = this.checkScreenSize();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        this.currentUrl = data.urlAfterRedirects;
        this.showUserMenu = this.checkRouterUrl(this.currentUrl);
        if (this.showUserMenu) {
          this.authService.getCurrentUser().subscribe(({ name }) => {
            this.userName = name;
          });
        } else {
          this.userName = null;
        }
      });
    this.subscription.add(
      this.screenService.onResize.subscribe(() => {
        this.mobileScreen = this.checkScreenSize();
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkScreenSize(): boolean {
    return window.screen.width < screenWidth.maxMobile;
  }

  public handlerClickOnLogoutIcon(): void {
    this.onRemoveToken();
    this.router.navigate(['login']);
  }

  private onRemoveToken(): void {
    localStorage.clear();
  }

  private checkRouterUrl(currentUrl): boolean {
    const routerConfig: (string | RegExp)[] = [
      /home$/,
      /vocabulary$/,
      /training$/,
      /new-word$/,
      /\/new-word\/[^/]+$/,
    ];
    return routerConfig.some((item) => {
      return currentUrl.match(item);
    });
  }
}
