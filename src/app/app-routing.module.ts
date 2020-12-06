import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {HomeComponent} from "./views/home/home.component";
import {PatientRegComponent} from "./views/patient-reg/patient-reg.component";
import {DoctorComponent} from "./views/doctor/doctor.component";
import {MohComponent} from "./views/moh/moh.component";
import {PatientResponseComponent} from "./views/patient-response/patient-response.component";
import {AuthGuard} from "./services/auth-guardDoctor.service";
import {AuthGuard2} from "./services/auth-guardMoh.service";
import {PatientComponent} from "./views/patient/patient.component";
import {HospitalAddComponent} from "./views/hospital-add/hospital-add.component";
import {PatientStaticsComponent} from "./views/patient-statics/patient-statics.component";
import {PatientListComponent} from "./views/patient-list/patient-list.component";
import {DoctorListComponent} from "./views/doctor-list/doctor-list.component";


const routes: Routes = [
  {
    path : 'login', component : LoginComponent
  },
  {
    path : 'home', component: HomeComponent
  },
  {
    path : 'register', component : PatientRegComponent
  },
  {
    path : 'patient', component : PatientComponent
  },
  {
    path : 'doctor', component : DoctorComponent, canActivate: [AuthGuard]
  },
  {
    path : 'moh', component : MohComponent, canActivate: [AuthGuard2]
  },
  {
    path: "patientList", component: PatientListComponent
  },
  {
    path: "doctorList", component: DoctorListComponent
  },
  {
    path : 'addhospital', component : HospitalAddComponent
  },
  {
    path : 'statics/:id', component : PatientStaticsComponent
  },
  {
    path : 'patientResponse', component : PatientResponseComponent
  },
  {
    path: "", pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: "**", redirectTo: 'home'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
