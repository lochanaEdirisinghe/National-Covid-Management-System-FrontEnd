import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import {Patient} from "../../dto/patient";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patientList:Patient[]=[];

  constructor(private route:ActivatedRoute, private patientService : PatientService) { }

  ngOnInit(): void {
      this.patientService.patientGetAll().subscribe((resp)=>{
            this.patientList=resp.data;
            console.log(this.patientList);
      })
  }

}
