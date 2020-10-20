import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";

@Injectable({
  providedIn: 'root'
})
export class MohService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/v1/moh"

  getQueue():Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url+"/queue");
  }

  getBedCount():Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url+"/beds");
  }

  addHospital(hospital): Observable<ResponseDto > {
    return this.http.post<ResponseDto>(this.url, hospital);
  }

  updateQueue(hospitalId):Observable<ResponseDto>{
    return this.http.put<ResponseDto>(this.url+"?hospitalId="+hospitalId, null);
  }
}
