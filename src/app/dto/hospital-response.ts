import {HospitalBedResponse} from "./hospital-bed-response";

export class HospitalResponse {
  constructor(public code?:number,public message?:string,public data?:HospitalBedResponse) {
  }
}
