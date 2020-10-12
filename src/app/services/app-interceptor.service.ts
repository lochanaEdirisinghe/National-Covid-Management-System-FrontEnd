import { Injectable } from '@angular/core';
import {TOKEN_KEY} from "../constants/constant";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService ) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.indexOf('/patient') >= 0){
      return next.handle(request);
    }

    if(request.url.indexOf('/auth') >= 0){
      return next.handle(request);
    }

    let token = localStorage.getItem(TOKEN_KEY);
    let newRequest = request.clone({headers: new HttpHeaders("Authorization:Bearer " + token)});
    console.log(newRequest)

    return next.handle(newRequest).pipe(catchError((err) => {
      //check the response
      if (err.status == "401") {
        let b = confirm("Please Login Again..!");
        if (b) {
          this.authService.logout();
        }
      }
      throw (err);
    }));
  }
}
