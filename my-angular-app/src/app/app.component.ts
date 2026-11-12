import {
  Component,
  OnInit
} from '@angular/core';

import {
  RouterOutlet
} from '@angular/router';

import { NavbarComponent }
from './shared/components/navbar/navbar.component';

import { AuthService }
from './core/services/auth.service';

import { FooterComponent }
from './shared/components/footer/footer.component';

import { CookieBannerComponent }
from './shared/components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CookieBannerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.authService
    .loadCurrentUser()
    .subscribe({
      error: () => {}
    });
  }
}