import {
  Component,
  OnInit,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent
implements OnInit {

  private readonly platformId =
    inject(PLATFORM_ID);

  isVisible = false;

  ngOnInit(): void {

    if (
      !isPlatformBrowser(
        this.platformId
      )
    ) {
      return;
    }

    const consent =
      localStorage.getItem(
        'cookieConsent'
      );

    this.isVisible =
      consent !== 'accepted';
  }

  acceptCookies(): void {

    if (
      !isPlatformBrowser(
        this.platformId
      )
    ) {
      return;
    }

    localStorage.setItem(
      'cookieConsent',
      'accepted'
    );

    this.isVisible = false;
  }
}