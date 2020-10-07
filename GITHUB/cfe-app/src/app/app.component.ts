import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BackendApiService} from './services/backend-api.service'
import {LoginService} from './services/login.service';
import {CookieService} from 'ngx-cookie-service';
import * as $ from 'jquery';

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
    //Toggle Click Function
$("#menu-toggle").click(function(e) {
e.preventDefault();
$("#wrapper").toggleClass("toggled");
});
}

  public toggleOptionsDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  // public toggleOptionsDropdown(){
  //     $(".app.component.html").ready(() =>{
  //     $(".button-collapse").sideNav2();
  //     var sideNavScrollbar = document.querySelector('.custom-scrollbar');
  //     var ps = new PerfectScrollbar(sideNavScrollbar);
  //   });
  // }
}