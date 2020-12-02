import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private backendApiService: BackendApiService, private route: ActivatedRoute, private router: Router) { }

  re = new RegExp('[a-zA-Z0-9._%+-^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+'); //regex used to check if email is in correct format
/** Function when the form is submitted, get the values and pass them to the server */
  submitUserFunction() { 
    var real_name = "'" + (<HTMLInputElement>document.getElementById("real_name")).value + "'"; //gets real name
    var username = "'" + (<HTMLInputElement>document.getElementById("username")).value + "'"; //get username
    var email = "'" + (<HTMLInputElement>document.getElementById("email")).value + "'"; //get email
    var hash = "'" + CryptoJS.MD5((<HTMLInputElement>document.getElementById("password")).value) + "'"; //get password and hash it immediately

    var dict = {"real_name": real_name, "username": username, "hash": hash, "email": email}; //place the variables into the dictionary

    if ((<HTMLInputElement>document.getElementById("password")).value != (<HTMLInputElement>document.getElementById("confirmpassword")).value || (<HTMLInputElement>document.getElementById("password")).value == ""){
      alert("Passwords don't match"); //if password and confirm password don't match, error
    }else if(this.re.test(email) == false){
      alert("Email not valid"); //if email isn't in correct format, error
    }else if(username == "''"){
      alert("Invalid name"); //if username is left blank, error
    }
    else{
      this.backendApiService.backendRequest("persistInsertUser", dict).subscribe(obj =>{ //otherwise send data to server and database
        if(obj.hasOwnProperty('error')){
          var errormsg = obj.error; //if the server has an error, display it
          alert("Error! " + errormsg);
        }
        else{
          this.router.navigateByUrl('/login'); //return to homepage after user is created
        }
      });
    }
  }
  /** Event function that looks for the 'Enter' key being pressed */
  keyPress(Event){
    if(Event.keyCode==13){
      this.submitUserFunction(); //submits create user if enter is pressed
    }
  }
  ngOnInit() {
  }

}
