import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationExtras, Router, ActivatedRoute} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";
import {HospitalBeds} from "../../dto/hospital-beds";
import {of} from "rxjs";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorId;
  hospitalId;
  hospitalName;

  hospitalBed : HospitalBeds[] = []

  constructor(private router: Router, private route: ActivatedRoute ,private http : HttpClient, private doctorService: DoctorService, private patientService: PatientService) {

    this.route.queryParamMap.subscribe((value)=> {
      this.doctorId=value.get('doctorId')
    })
  }

  ngOnInit(): void {
    this.doctorService.getBedDetails( this.doctorId ).subscribe( (response) => {
      if (response.code != 200) {
        alert( "Invalid " );
      } else if (response.code == 200 && response.data != null) {
        this.hospitalId = response.data.hospitalId;
        this.hospitalName = response.data.hospitalName
        this.hospitalBed = response.data.hospitalBeds
      }
    });
  }

  isadmitted(bed, patientId){
    console.log(this.hospitalBed.findIndex(x => x.patientId ===bed.patientId))
      this.patientService.update(patientId, this.doctorId, 'admit').subscribe((resp)=>{
        if(resp.data==true){
          this.hospitalBed[this.hospitalBed.findIndex(x => x.patientId ===bed.patientId)].admitted=resp.data
        }
      })

  }
  isdischarged(bed, patientId){
    this.patientService.update(patientId, this.doctorId, 'discharge').subscribe((resp)=>{
      if(resp.data==true){
        this.hospitalBed.splice(this.hospitalBed.findIndex(x => x.patientId ===bed.patientId), 1)
      }
    })
  }

  patientView(patientId){
      this.patientService.patientGet(patientId).subscribe((resp)=>{
        console.log(resp.data)
      })
}


}


