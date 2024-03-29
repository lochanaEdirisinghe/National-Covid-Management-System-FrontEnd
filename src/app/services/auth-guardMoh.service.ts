import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {ROLE, TOKEN_KEY, USER_DTO} from "../constants/constant";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    let token = localStorage.getItem(TOKEN_KEY);
    let user = localStorage.getItem(USER_DTO);
    let role = localStorage.getItem(ROLE);
    if (token != null && user != null && role == 'moh') {
      return true;
    } else {
      return false;
    }
  }
}
