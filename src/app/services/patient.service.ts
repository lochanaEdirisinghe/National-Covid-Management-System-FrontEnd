import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/v1/patient"

  register(patient): Observable<ResponseDto > {
    return this.http.post<ResponseDto>(this.url, patient);
  }
}
