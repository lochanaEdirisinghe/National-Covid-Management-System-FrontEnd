import { Component, OnInit } from '@angular/core';
import {Count} from "../../dto/count";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalCount;
  activecases;
  dischargedcount;


  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getTotalCount().subscribe((resp)=>{
      this.activecases=resp.data.activecount;
      this.dischargedcount = resp.data.discharged
      this.totalCount = (resp.data.activecount + resp.data.discharged);
      console.log(resp.data)
    })
  }

}
