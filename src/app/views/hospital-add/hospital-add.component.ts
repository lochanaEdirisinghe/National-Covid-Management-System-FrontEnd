import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MohService} from "../../services/moh.service";

@Component( {
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css']
} )
export class HospitalAddComponent implements OnInit {

  form = new FormGroup( {
    hospitalId: new FormControl( '', [Validators.required] ),
    name: new FormControl( '', [Validators.required] ),
    district: new FormControl( '', [Validators.required] ),
    locationX: new FormControl( '', [Validators.required, Validators.pattern( '[0-9]{2,3}' )] ),
    locationY: new FormControl( '', [Validators.required, Validators.pattern( '[0-9]{2,3}' )] )

  } );

  constructor(private mohService:MohService) {
  }

  ngOnInit(): void {
  }

  get hospitalId() {
    return this.form.get( 'hospitalId' )
  }

  get name() {
    return this.form.get( 'name' )
  }

  get district() {
    return this.form.get( 'district' )
  }

  get locationX() {
    return this.form.get( 'locationX' )
  }

  get locationY() {
    return this.form.get( 'locationY' )
  }

  addHospital(){
    this.mohService.addHospital(this.form.value).subscribe((resp)=>{
      console.log(resp.data)
    })
  }

}
