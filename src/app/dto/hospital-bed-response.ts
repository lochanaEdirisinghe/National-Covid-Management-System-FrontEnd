import {HospitalBeds} from "./hospital-beds";

export class HospitalBedResponse {
  constructor(public hospitalId?:string ,public hospitalName?:string,public hospitalBeds?:HospitalBeds[]) {
  }
}
