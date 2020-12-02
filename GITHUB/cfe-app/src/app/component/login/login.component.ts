import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private backendApiService: BackendApiService, private route: ActivatedRoute, private router: Router, private loginService: LoginService, private cookieService: CookieService) { 

  }

  re = new RegExp('[a-zA-Z0-9._%+-^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+'); //regex for checking email format

  submitLoginFunction() { //when user clicks submit for login, run these commands
    var email = (<HTMLInputElement>document.getElementById("email")).value; //store the email
    var hash = CryptoJS.MD5((<HTMLInputElement>document.getElementById("password")).value); //hash the password and store the hash

    if ((<HTMLInputElement>document.getElementById("password")).value == "" || (<HTMLInputElement>document.getElementById("email")).value == ""){
      alert("A text field is empty"); //check if the email or password is empty and error if so
    }else{
      /**
       * Login user query to backend server.
       * The password hash and the email entered by the user are passed in.
       * Returns a named error if credentials are invalid 
       * and returns the name, email, user id, and cookie verification certificate if valid
       */
      this.loginService.submitLoginFunction(email,hash.toString()).subscribe(obj =>{
        console.log(obj.results);
        if(obj.results==null){ //If the server returns nothing, the username or password was incorrect, try again
          alert("Invalid Username Or Password");
        }
        else{ //take the role, name, and userid that was returned and store it for use later
          console.log(obj.results);
          this.loginService.login(obj.results[0].real_name,email,obj.results[0].user_id,obj.certificate);
          this.router.navigateByUrl('/'); //return to home page
        }
      });  
    }
  }
  /**
   * Function used to provide enter button submit functionality
   */
  keyPress(Event){
    if(Event.keyCode==13){
      this.submitLoginFunction();
    }
  }
  ngOnInit() {
  }

}