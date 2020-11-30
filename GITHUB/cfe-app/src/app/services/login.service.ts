import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BackendApiService } from './backend-api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private cookieService: CookieService, private backendApiService: BackendApiService, private router: Router) {
  }

  public login(username: string, useremail: string, id: number, certificate: string): void {
    this.cookieService.set('loggedIn', 'true');
    this.cookieService.set('name', username);
    this.cookieService.set('email', useremail);
    this.cookieService.set('userID', id.toString());
    this.cookieService.set('certificate', certificate);
  }

  public isLoggedIn(): boolean {
    return this.cookieService.get('loggedIn') == 'true';
  }
  public getRole(): string {
    return this.cookieService.get('role');
  }
  public getName(): string {
    return this.cookieService.get('name');
  }
  public getID(): number {
    return +this.cookieService.get('userID');
  }
  public getCertificate(): string {
    return this.cookieService.get('certificate');
  }
  public getEmail(): string {
    return this.cookieService.get('email');
  }
  public logout() {
    this.cookieService.delete('loggedIn');
    this.cookieService.delete('role');
    this.cookieService.delete('name');
    this.cookieService.delete('email');
    this.cookieService.delete('userID');
    this.cookieService.delete('certificate');
  }
 
  submitLoginFunction(email: string, hash: string): Observable<any> { //when user clicks submit for login, run these commands
    var dict = { "hash": hash, "email": email }; //put variables into a dictionary
    dict["certificate"] = this.getCertificate();
    dict["userID"] = this.getID();
    /**
     * Login user query to backend server.
     * The password hash and the email entered by the user are passed in.
     * Returns a named error is credentials are invalid 
     * and returns the name, email, user id, and cookie verification certificate if valid
     */
    return this.backendApiService.backendRequest("loginUser", dict);
  }
}