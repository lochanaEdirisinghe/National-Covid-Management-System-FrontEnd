import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ROLE} from "../constants/constant";

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>();
  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }

  toggle(id) {
    this.change.emit(id);
  }

}
