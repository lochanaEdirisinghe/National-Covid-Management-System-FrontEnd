import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ROLE, TOKEN_KEY, USER_DTO} from "../../constants/constant";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get userId(){
    return this.form.get('userId')
  }

  get passWord(){
    return this.form.get('password')
  }

  login() {
    this.authService.login(this.form.value).subscribe((response) => {
       if (response.code == 401) {
        alert("Username And Password is Incorrect");
      } else if (response.code == 200) {
        //store user and token in the browser
        localStorage.setItem(TOKEN_KEY, response.message);
        localStorage.setItem(USER_DTO, JSON.stringify(response.data));
        localStorage.setItem(ROLE, response.data.role);

         //navigate to views
        if(response.data.role == 'doctor'){
          this.router.navigate( ['/doctor'], {
            queryParams:{doctorId: this.userId.value}
          });
        }else if(response.data.role == 'moh'){
          this.router.navigate( ['/moh']);
        }
      }

    });
  }

}
