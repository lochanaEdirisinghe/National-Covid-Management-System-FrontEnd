import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";

@Injectable( {
  providedIn: 'root'
} )
export class PatientService {

  constructor(private http: HttpClient) {
  }

  url = "http://localhost:8080/api/v1/patient"
  //url = "http://ec2-52-73-113-153.compute-1.amazonaws.com:8080/NCMS_Project-1.0.0/api/v1/patient"


  register(patient): Observable<ResponseDto> {
    return this.http.post<ResponseDto>( this.url, patient );
  }

  update(patientId, doctorId, slevel, doctorRole): Observable<ResponseDto> {
    return this.http.options<ResponseDto>( this.url + "?patientId=" + patientId + "&doctorId=" + doctorId + "&doctorRole=" + doctorRole + "&slevel=" +slevel );

  }

  patientGet(patientId): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + "/id?patientId=" + patientId );
  }

  patientGetAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + "/" );
  }

  getTotalCount(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + "/totalcount" );
  }

  getHospitalPatientCount(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + "/hospitalcount" );
  }


}
