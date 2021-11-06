import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'economic-game';

  constructor(private _userService: UserService, private _router: Router) { }

  isLoggedIn() {
    return this._userService.isLoggedIn();
  }

  doLogout() {
    this._userService.logout();
  }
}
