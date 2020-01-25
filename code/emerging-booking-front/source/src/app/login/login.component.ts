import { Component, OnInit } from '@angular/core';
import { AppSession } from '../core/app-session';
import { HomeHostService } from '../home/shared/home-host.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private homeHostService: HomeHostService
  ) { }

  ngOnInit() { }

  stayLogged(): boolean {
    return AppSession.isLoggedIn();
  }

  logout() {
    this.homeHostService.logoutHost();
  }

  redirectAuthorizationServer() {
    AppSession.redirectPageLogin();
  }
}
