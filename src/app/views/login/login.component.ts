import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
  }

  login() {
    /*this.oauthService.login(this.form.value).subscribe((response) => {
      if (response.code == 401) {
        alert("Username And Password is Incorrect");
      } else if (response.code == 200) {
        //store user and token in the browser
        localStorage.setItem(TOKEN_KEY, response.message);
        localStorage.setItem(USER_DTO, JSON.stringify(response.data));
        //navigate to views
        this.router.navigate(['views']);
      }*/

    };

}
