import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";
import {Doctor} from "../../dto/doctor";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  hospitalId;
  hospitalName;
  directorId;
  doctorList:Doctor[]=[]

  constructor(private route: ActivatedRoute, private doctor: DoctorService) {
    this.route.queryParamMap.subscribe( (value) => {
      this.hospitalId = value.get('hospitalId')
      console.log(this.hospitalId)
      this.hospitalName = value.get('hospitalName')
      this.directorId = value.get('directorId')
    } )
  }

  ngOnInit(): void {
    this.doctor.getDoctorList(this.hospitalId).subscribe((resp)=>{
      this.doctorList=resp.data;
    })

  }

}
