import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-patient-reg',
  templateUrl: './patient-reg.component.html',
  styleUrls: ['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
    district: new FormControl(),
    contactNo: new FormControl(),
    email: new FormControl(),
    locationX: new FormControl(),
    locationY: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
  }

  register(){

  }

}
