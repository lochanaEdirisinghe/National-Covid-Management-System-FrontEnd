import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-response',
  templateUrl: './patient-response.component.html',
  styleUrls: ['./patient-response.component.css']
})
export class PatientResponseComponent implements OnInit {

  serialNo: string
  bedNo: number
  hospitalName: string
  queueNo: number
  bedAvailablility: boolean

  @Input() patient
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      serialNo: string,
      bedNo: number,
      hospitalName: string,
      queueNo: number
    };

    this.serialNo= state.serialNo
    this.bedNo=state.bedNo
    this.hospitalName=state.hospitalName
    this.queueNo= state.queueNo
    if(this.queueNo>0){
      this.bedAvailablility = false
    }else {
      this.bedAvailablility =true
    }
  }

  ngOnInit(): void {

  }




}
