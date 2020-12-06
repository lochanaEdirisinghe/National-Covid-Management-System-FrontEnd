import { Component, OnInit } from '@angular/core';
import {MohService} from "../../services/moh.service";
import {Queue} from "../../dto/queue";
import {Count} from "../../dto/count";
import {Router} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import {SharedServiceService} from "../../services/shared-service.service";
import {DistrictCount} from "../../dto/district-count";
import {Patient} from "../../dto/patient";
import {DoctorService} from "../../services/doctor.service";
import {Doctor} from "../../dto/doctor";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Hospital} from "../../dto/Hospital";

@Component({
  selector: 'app-moh',
  templateUrl: './moh.component.html',
  styleUrls: ['./moh.component.css']
})
export class MohComponent implements OnInit {

  queue : Queue[]=[]
  hospitalDetails: Hospital[]=[]
  patientlist:Patient[]=[];
  alldoctorList:Doctor[]=[]
  visibleButton=false;

  queueState=false;
  hospitalState=true;
  doctorState=false;
  patientState=false
  doctorAddState=false

  form = new FormGroup( {
    doctorId: new FormControl( '', [Validators.required] ),
    name: new FormControl( '', [Validators.required] ),
    hospital: new FormControl( '', [Validators.required] ),
    contactNo: new FormControl( '', [Validators.required, Validators.pattern( '[0-9]{10}' )] ),
    director: new FormControl( '', [Validators.required])


  } );

  districtHospitalcount: DistrictCount[] = [new DistrictCount( "District_A", 0 ),
    new DistrictCount( "District_B", 0 ),
    new DistrictCount( "District_C", 0 ),
    new DistrictCount( "District_D", 0 ),
    new DistrictCount( "District_E", 0 )]

  constructor(private docService:DoctorService, private mohService:MohService, private router:Router , private patientService: PatientService, private sharedService: SharedServiceService) {
    this.sharedService.sendClickEvent();
  }

  ngOnInit(): void {
    this.mohService.getAllHospitals().subscribe((resp)=>{
      this.hospitalDetails = resp.data;
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


  get doctorId() {
    return this.form.get( 'doctorId' )
  }

  get name() {
    return this.form.get( 'name' )
  }

  get hospital() {
    return this.form.get( 'hospital' )
  }

  get contactNo() {
    return this.form.get( 'contactNo' )
  }

  get director() {
    return this.form.get( 'director' )
  }

  hospitalAdd(){
    this.router.navigate(['/addhospital'])
  }

  viewPatient(patientId){
    this.router.navigate( ['/patient'], {
      queryParams:{patientId:patientId, doctorId:"moh"}
    });
  }

  /*patientList(){
    this.router.navigate(['/patientList'])
  }*/

  doctorList(){
    this.docService.getAllDoctorList().subscribe((resp)=>{
      this.alldoctorList=resp.data;
    })

    this.doctorState=true
    this.queueState=false
    this.hospitalState=false
    this.patientState=false
    this.doctorAddState=false
  }
  queueDetails(){
    this.doctorState=false
    this.queueState=true
    this.hospitalState=false
    this.patientState=false
    this.doctorAddState=false
  }

  hospitalList(){
    this.doctorState=false
    this.queueState=false
    this.hospitalState=true
    this.patientState=false
    this.doctorAddState=false
  }

  patientList(){

    this.patientService.patientGetAll().subscribe((resp)=>{
      this.patientlist=resp.data;
      console.log(this.patientlist);
    })
    this.doctorState=false
    this.queueState=false
    this.hospitalState=false
    this.patientState=true
    this.doctorAddState=false
  }

  addDoctor(){
    this.doctorAddState=true
    this.doctorState=false
    this.queueState=false
    this.hospitalState=false
    this.patientState=false
  }

  saveDoctor(){
    if(this.form.valid){
      this.docService.addNewDoctor(this.form.value).subscribe((resp)=>{
        console.log(resp.data)
        if(resp.data==true){
          alert("Doctor is added successfully")
        }else {
          alert("Invalid Details")
        }
      })
      this.form.reset()
    }else {
      alert("Fill all the input fields")
    }
  }
}
