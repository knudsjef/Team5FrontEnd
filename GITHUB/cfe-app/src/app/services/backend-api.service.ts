import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  private baseUrl: string = "https://nimmo.us/";
  // private baseUrl: string = "http://localhost:8090/";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // url should be the address to the server API
  // arguments should be a dictionary... example: var dict = {"id":"1","key2":"value2"}
  public backendRequest(url: string, args={}): Observable<any> {
    args["certificate"] = this.cookieService.get('certificate');
    args["userID"] = this.cookieService.get('userID');

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    for(var key in args) {
      formData.append(key,args[key])
    }

    // create a http-post request and pass the form
    const req = new HttpRequest('POST', this.baseUrl + url, formData, {
      responseType: 'text'
    });

    const response = new Subject<any>();

    // send the http-request and subscribe for progress-updates
    this.http.request(req).subscribe(event => {
      if (event instanceof HttpResponse) {
        response.next(JSON.parse(event.body as string));
        response.complete();
      }
    }, (error) => {
      response.next({error:"The server responded with an error"});
      response.complete();
      });

    // return the map of progress.observables
    return response.asObservable();
  }
}