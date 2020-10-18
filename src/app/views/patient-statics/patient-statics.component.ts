import {Component, OnInit} from '@angular/core';
import {Count} from "../../dto/count";
import {PatientService} from "../../services/patient.service";
import {ActivatedRoute} from "@angular/router";
import {DistrictCount} from "../../dto/district-count";

@Component( {
  selector: 'app-patient-statics',
  templateUrl: './patient-statics.component.html',
  styleUrls: ['./patient-statics.component.css']
} )
export class PatientStaticsComponent implements OnInit {
  hospital = false
  disctict = false
  hospitalStatics: Count[] = []
  districtStatics: DistrictCount[] = [new DistrictCount( "District_A", 0 ),
    new DistrictCount( "District_B", 0 ),
    new DistrictCount( "District_C", 0 ),
    new DistrictCount( "District_D", 0 ),
    new DistrictCount( "District_E", 0 )]

  constructor(private patientService: PatientService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe( (value) => {
      console.log( value.get( 'id' ) )
      if (value.get( 'id' ) == "hospital") {
        this.hospital = true
        this.disctict = false
      } else if (value.get( 'id' ) == "district") {
        this.hospital = false
        this.disctict = true
      }
    } );
    this.patientService.getHospitalPatientCount().subscribe( (resp) => {
      this.hospitalStatics = resp.data;

      for (let i = 0; i< this.hospitalStatics.length; i++){
        console.log(this.hospitalStatics[1].district)
        if (this.hospitalStatics[i].district == "district_A") {
          this.districtStatics[0].count= this.districtStatics[0].count + this.hospitalStatics[i].count
        }else if(this.hospitalStatics[i].district == "district_B"){
          this.districtStatics[1].count+=this.hospitalStatics[i].count
        }else if(this.hospitalStatics[i].district == "district_C"){
          this.districtStatics[2].count+=this.hospitalStatics[i].count
        }
        else if(this.hospitalStatics[i].district == "district_D"){
          this.districtStatics[3].count+=this.hospitalStatics[i].count
        }
        else if(this.hospitalStatics[i].district == "district_E"){
          this.districtStatics[4].count+=this.hospitalStatics[i].count
        }
      }
    } );
  }

}
