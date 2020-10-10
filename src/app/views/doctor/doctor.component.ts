import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationExtras, Router, ActivatedRoute} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorId;
  hospitalId;
  hospitalName;
  constructor(private router: Router, private route: ActivatedRoute ,private http : HttpClient, private doctorService: DoctorService) {

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
      }
    } );
  }


}


