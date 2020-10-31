import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }


  //url = "http://localhost:8080/api/v1/doctor"
  url = "http://ec2-52-73-113-153.compute-1.amazonaws.com:8080/NCMS_Project-1.0.0/api/v1/doctor"


  getBedDetails(doctorId): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + "/id?doctorId=" + doctorId );
  }

  checkIsdirector(doctorId):Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + "/check?doctorId=" + doctorId );
  }

  updateDoctor(hospitalId, doctorId): Observable<ResponseDto> {
    return this.http.options<ResponseDto>(this.url + "?doctorId=" + doctorId +"&hospitalId="+hospitalId);
  }
}
