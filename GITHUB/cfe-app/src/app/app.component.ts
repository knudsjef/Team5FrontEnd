import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BackendApiService} from './services/backend-api.service'
import {LoginService} from './services/login.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public dropdownOpen = false;
  loggedIn = false;
  constructor(private spinner: NgxSpinnerService, private backendApiService: BackendApiService, public loginService: LoginService, private cookieService: CookieService) {
  }

  logoutFunction(){
    this.cookieService.deleteAll();
    this.loginService.logout();
  }

  
  ngOnInit() {
    this.loggedIn = this.loginService.isLoggedIn();
  
  }
  public closeOptionsDropdown() {
    this.dropdownOpen = false;
  }

  public toggleOptionsDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


}