import { Injectable } from '@angular/core';
import {TOKEN_KEY} from "../constants/constant";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {error} from "selenium-webdriver";

@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor{

  newRequest;

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.indexOf('/patient') >= 0){
      this.newRequest=request
    }else if(request.url.indexOf('/auth') >= 0){
      this.newRequest=request
    }else{
      let token = localStorage.getItem(TOKEN_KEY);
      this.newRequest = request.clone({headers: new HttpHeaders("Authorization:Bearer " + token)});
    }

    return next.handle(this.newRequest).pipe(catchError((err: HttpErrorResponse) => {
      //check the response
      if (err.status == 401) {
        let b = confirm("Please Login Again..!");
        if (b) {
          this.authService.logout();
        }
      }
      return throwError(err.message || "server error.");

    }));
  }
}
