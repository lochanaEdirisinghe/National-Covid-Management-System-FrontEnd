import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationExtras, Router, ActivatedRoute} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";
import {HospitalBeds} from "../../dto/hospital-beds";
import {of} from "rxjs";
import {PatientService} from "../../services/patient.service";
import {TOKEN_KEY} from "../../constants/constant";
import {SharedServiceService} from "../../services/shared-service.service";

@Component( {
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
} )
export class DoctorComponent implements OnInit {

  doctorId;
  hospitalId;
  hospitalName;

  hospitalBed: HospitalBeds[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedServiceService, private doctorService: DoctorService, private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem( "doctorId" );
    this.doctorService.getBedDetails( this.doctorId ).subscribe( (response) => {
      if (response.code != 200) {
        alert( "Invalid");
      } else if (response.code == 200 && response.data != null) {
        this.hospitalId = response.data.hospitalId;
        this.hospitalName = response.data.hospitalName;

        for (var i = 0; i < (response.data.hospitalBeds).length; i++) {
          if ((response.data.hospitalBeds)[i].admitted == true) {

            this.hospitalBed.push( new HospitalBeds( (response.data.hospitalBeds)[i].bedId, (response.data.hospitalBeds)[i].patientId, 'admitted', true/*(response.data.hospitalBeds)[i].discharged*/ ) );
          } else {
            this.hospitalBed.push( new HospitalBeds( (response.data.hospitalBeds)[i].bedId, (response.data.hospitalBeds)[i].patientId, 'notAdmited ', false) );
          }
        }
      }
    } )

    this.sharedService.sendClickEvent();
  }


  isdischarged(bed, patientId) {
    this.patientService.update( patientId, this.doctorId, '', 'discharge' ).subscribe( (resp) => {
      if (resp.data == true) {
        this.hospitalBed.splice( this.hospitalBed.findIndex( x => x.patientId === bed.patientId ), 1 )
      }
    } )
  }

  patientView(patientId) {
    this.router.navigate( ['/patient'], {
      queryParams: {
        patientId: patientId,
        doctorId: this.doctorId
      }
    } );
  }

}


