import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  url = "http://localhost:8080/api/v1/auth/login"

  login(user): Observable<ResponseDto > {
    return this.http.post<ResponseDto >(this.url, user);
  }
}
