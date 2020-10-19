import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ROLE} from "../../constants/constant";
import {SharedServiceService} from "../../services/shared-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  islogged: boolean;
  clickEventsubscription:Subscription;
  constructor(private router: Router, private authservice: AuthService, private sharedService: SharedServiceService) {

    this.clickEventsubscription=this.sharedService.getClickEvent().subscribe(()=>{
      this.islogged=true
    })
  }

  ngOnInit(): void {

  }

  logout(){
    this.authservice.logout()
    this.islogged=false;
    this.router.navigate(['/home']);
  }
}
