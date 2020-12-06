import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorComponent } from './views/doctor/doctor.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { MohComponent } from './views/moh/moh.component';
import { PatientRegComponent } from './views/patient-reg/patient-reg.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PatientResponseComponent } from './views/patient-response/patient-response.component';
import {AppInterceptor} from "./services/app-interceptor.service";
import { PatientComponent } from './views/patient/patient.component';
import { HospitalAddComponent } from './views/hospital-add/hospital-add.component';
import { PatientStaticsComponent } from './views/patient-statics/patient-statics.component';
import { PatientListComponent } from './views/patient-list/patient-list.component';
import { DoctorListComponent } from './views/doctor-list/doctor-list.component';



@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MohComponent,
    PatientRegComponent,
    PatientResponseComponent,
    PatientComponent,
    HospitalAddComponent,
    PatientStaticsComponent,
    PatientListComponent,
    DoctorListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
