import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";
import {TOKEN_KEY} from "../constants/constant";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/v1/doctor"


  getBedDetails(doctorId): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + "?doctorId=" + doctorId );
  }
}
