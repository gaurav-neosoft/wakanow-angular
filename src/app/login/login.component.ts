// src/app/login/login.component.ts
import { Component } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; // Initialize with an empty string
  password: string = ''; // Initialize with an empty string

  constructor(private authService: AuthenticationService) {}

  login() {
    console.log('Logging in with email:', this.email, 'and password:', this.password);
    this.authService.login(this.email, this.password);
  }
}

