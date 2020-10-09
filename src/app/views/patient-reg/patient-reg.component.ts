import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../services/patient.service";
import {PatientDto} from "../../dto/patient-dto";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-patient-reg',
  templateUrl: './patient-reg.component.html',
  styleUrls: ['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')]),
    gender: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required , Validators.pattern('[0-9]{10}')]),
    email: new FormControl(),
    locationX: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2,3}')]),
    locationY: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2,3}')])

  });

  patient : PatientDto = null;

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
  }

  get firstName(){
    return this.form.get('firstName')
  }
  get lastName(){
    return this.form.get('lastName')
  }
  get age(){
    return this.form.get('age')
  }
  get gender(){
    return this.form.get('gender')
  }
  get district(){
    return this.form.get('district')
  }
  get contactNo(){
    return this.form.get('contactNo')
  }
  get email(){
    return this.form.get('email')
  }
  get locationX(){
    return this.form.get('locationX')
  }
  get locationY(){
    return this.form.get('locationY')
  }

  register(){
    console.log(this.form.value)
    this.patientService.register(this.form.value).subscribe((response) => {
      if (response.code != 200) {
        alert( "Invalid Patient" );
      }else if (response.code == 200 && response.data != null ) {
        this.patient=response.data
        console.log(this.patient)

        const navigationExtras: NavigationExtras = {
          state: {
            serialNo: this.patient.serialNo,
            bedNo: this.patient.bedNo,
            hospitalName: this.patient.hospitalName,
            queueNo: this.patient.queueNo
          }
        };
        //navigate to views
        this.router.navigate( ['patientResponse'], navigationExtras);
      }
    });
    this.form.reset()
  }

}
