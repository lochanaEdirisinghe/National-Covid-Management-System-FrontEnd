import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  name
  patientId
  age
  district
  contactNo
  admit_date
  admitted_by

  constructor(private route:ActivatedRoute) {
    this.route.queryParamMap.subscribe((value)=> {
      this.patientId=value.get('patientId')
      this.name=value.get('name')
      this.age=value.get('age')
      this.district=value.get('district')
      this.contactNo=value.get('contactNo')
      if(value.get('admit_date')!=null){
        this.admit_date=value.get('admit_date')
        this.admitted_by=value.get('admitted_by')
      }else {
        this.admit_date="no"
        this.admitted_by="no"
      }

    })
  }


  ngOnInit(): void {

  }



}
