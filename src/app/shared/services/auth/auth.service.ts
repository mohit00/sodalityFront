import { Injectable, EventEmitter } from '@angular/core';
 
import { HttpClient , HttpInterceptor, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
   import { Subject } from 'rxjs';
   import { environment } from '../../../../../src/environments/environment';

 @Injectable({
  providedIn: 'root'
})
export class AuthService  {

BASE_URL =  environment.LOCAL_BASE;
  constructor(private _http: HttpClient, private router: Router 
    // tslint:disable-next-line: no-shadowed-variable
                 ) { }
      
     login(data:any): Observable < any > {
     
      return this._http.post(  this.BASE_URL+'user/login', data).pipe(
        // eg. "map" without a dot before
        map(data => {
          return data;
        }),
        // "catchError" instead "catch"
        catchError(error => {
          alert("Something went wrong ;)");
          return Observable.throw(error);
        })
      );
    }   
     handleError = (e)=>{
     }
}