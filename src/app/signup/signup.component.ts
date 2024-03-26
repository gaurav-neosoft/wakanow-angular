import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  id: number = 1;
  isApproved = false;
  password: string = '';
  email: string = '';
  fullName: string = '';
  postData = {};
  form!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) { 
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup() {
    // Add your signup logic here
    console.log('Signing up with Full Name:', this.fullName, 'Email:', this.email, 'and Password:', this.password);
    this.postData = {
      id: (++this.id).toString(),
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      isApproved: this.isApproved
    };

    this.http.post('http://localhost:3000/user', this.postData)
    .subscribe(
      response => {
        console.log('POST request successful:', response);
        window.alert('User successfully created!')
        // Handle the response data
      },
      error => {
        console.error('Error making POST request:', error);
        window.alert('User not created!')
        // Handle errors
      }
    );

  }
}
