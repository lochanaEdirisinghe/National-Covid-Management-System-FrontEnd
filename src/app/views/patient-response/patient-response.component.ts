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
  }

  ngOnInit(): void {

  }




}
