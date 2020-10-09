import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {HomeComponent} from "./views/home/home.component";
import {PatientRegComponent} from "./views/patient-reg/patient-reg.component";
import {DoctorComponent} from "./views/doctor/doctor.component";
import {MohComponent} from "./views/moh/moh.component";
import {PatientResponseComponent} from "./views/patient-response/patient-response.component";


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
    path : 'doctor', component : DoctorComponent
  },
  {
    path : 'moh', component : MohComponent
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
