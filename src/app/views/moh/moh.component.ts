import { Component, OnInit } from '@angular/core';
import {MohService} from "../../services/moh.service";
import {Queue} from "../../dto/queue";
import {Count} from "../../dto/count";
import {Router} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import {SharedServiceService} from "../../services/shared-service.service";
import {DistrictCount} from "../../dto/district-count";

@Component({
  selector: 'app-moh',
  templateUrl: './moh.component.html',
  styleUrls: ['./moh.component.css']
})
export class MohComponent implements OnInit {

  queue : Queue[]=[]
  hospitalDetails: Count[]=[]
  visibleButton=false;

  districtHospitalcount: DistrictCount[] = [new DistrictCount( "District_A", 0 ),
    new DistrictCount( "District_B", 0 ),
    new DistrictCount( "District_C", 0 ),
    new DistrictCount( "District_D", 0 ),
    new DistrictCount( "District_E", 0 )]

  constructor(private mohService:MohService, private router:Router , private patientService: PatientService, private sharedService: SharedServiceService) {
    this.sharedService.sendClickEvent();
  }

  ngOnInit(): void {
    this.mohService.getBedCount().subscribe((resp)=>{
      this.hospitalDetails = resp.data;

      for (let i = 0; i< this.hospitalDetails.length; i++){
        console.log(this.hospitalDetails[1].district)
        if (this.hospitalDetails[i].district == "district_A") {
          this.districtHospitalcount[0].count+= 1
        }else if(this.hospitalDetails[i].district == "district_B"){
          this.districtHospitalcount[1].count+=1
        }else if(this.hospitalDetails[i].district == "district_C"){
          this.districtHospitalcount[2].count+=1
        }
        else if(this.hospitalDetails[i].district == "district_D"){
          this.districtHospitalcount[3].count+=1
        }
        else if(this.hospitalDetails[i].district == "district_E"){
          this.districtHospitalcount[4].count+=1
        }
      }
      console.log(resp.data)
      this.sharedService.toggle("MoH");
    })

    this.mohService.getQueue().subscribe((resp)=>{
        this.queue=resp.data
      if(this.queue.length>3){
        this.visibleButton=true;
      }
    })

  }

  hospital(){
    this.router.navigate(['/addhospital'])
  }

  viewPatient(patientId){
    this.router.navigate( ['/patient'], {
      queryParams:{patientId:patientId, doctorId:"moh"}
    });
  }

  patientList(){
    this.router.navigate(['/patientList'])
  }

}
