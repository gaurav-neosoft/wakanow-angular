import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): void {
    this.http.get('http://localhost:3000/user/?email='+email+'&isApproved=1')
    .subscribe(
      response => {
        console.log('POST request successful:', response);
        if(response[0]){
          if(response[0].password === password && response[0].isApproved){
            this.isLoggedIn = true;
            localStorage.setItem('userId', response[0].id);
            this.router.navigate(['/home']);
          }
        }
        else if(response[0] && !response[0].isApproved){
          window.alert('User is not approved by admin!');
        }
        else{
          window.alert('User not found!');
        }
        // Handle the response data
      },
      error => {
        console.error('Error making POST request:', error);
        window.alert('User not created!');
        // Handle errors
      }
    );
  }

  logout(): void {
    // Perform logout logic
    this.isLoggedIn = false;
  }
}