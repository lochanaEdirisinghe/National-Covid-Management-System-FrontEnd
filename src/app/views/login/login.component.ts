import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get userName(){
    return this.form.get('username')
  }

  get passWord(){
    return this.form.get('password')
  }

  login() {
    this.authService.login(this.form.value).subscribe((response) => {
      if (response.code != 200) {
        alert( "Username And Password is Incorrect" );
      } else if (response.code == 200 && response.data == 'hospital') {
        //navigate to views
        this.router.navigate( ['hospital'] );
      } else if (response.code == 200 && response.data == 'moh') {
        this.router.navigate( ['moh'] );
      }
    });
  }

}
