import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../services/patient.service";
import {DoctorService} from "../../services/doctor.service";


@Component( {
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
} )
export class PatientComponent implements OnInit {

  name
  patientId
  age
  district
  contactNo
  admit_date
  admitted_by
  visible;
  doctorId;
  sLevel;

  form = new FormGroup( {
    slevel: new FormControl( '', [Validators.required] ),
  } );

  constructor(private route: ActivatedRoute, private patientService: PatientService, private doctorService: DoctorService) {
    this.route.queryParamMap.subscribe((value)=> {
      this.patientId=value.get('patientId')
      this.doctorId=value.get('doctorId')
    })
  }


  ngOnInit(): void {
    this.patientService.patientGet( this.patientId).subscribe( (resp) => {
      console.log( resp.data )
      this.age=resp.data.age;
      this.district=resp.data.district;
      this.contactNo=resp.data.contactNo;
      this.sLevel=resp.data.severityLevel
      if(this.doctorId=="moh") {
        this.admit_date = "no"
        this.admitted_by = "no"
        this.sLevel = "no"
        this.visible = false
      }else if(resp.data.admitDate!=null){
        this.admit_date=resp.data.admitDate
        this.admitted_by=resp.data.admittedBy
        this.visible=false
      } else {
        this.admit_date="no"
        this.admitted_by="no"
        this.sLevel="no"
        this.visible=true
      }

    } )
  }

  get slevel(){
    return this.form.get('slevel')
  }

  admit() {
    this.doctorService.checkIsdirector(this.doctorId).subscribe( (resp) => {
      if (resp.data == true) {
        this.patientService.update( this.patientId, this.doctorId, this.form.get('slevel').value, 'admit' ).subscribe( (resp) => {
          if (resp.data == true) {
            this.ngOnInit();
          }
        } )
      }else {
        alert("You are not a director!!!")
      }
    } )

  }


}
