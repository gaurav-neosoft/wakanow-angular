import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
	updateUserForm!: FormGroup;
	userData = {
		fullName: '',
		email:'',
		password:''
	};

	constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService) {
	}

	ngOnInit(): void {
		this.updateUserForm = this.fb.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
		});
		this.route.queryParams.subscribe(params => {
			this.userData = JSON.parse(params['data']);
			console.log(this.userData);
		  });

	}
	onSubmit(): void {
		if (this.updateUserForm.valid) {
			this.userService.updateUser(this.userData).subscribe(
				(response) => {
				  console.log('Data updated successfully:', response);
				  window.alert('User updated successfully');
				  this.router.navigate(['/home']);
				  // Perform any additional actions on successful update
				},
				(error) => {
				  console.error('Error updating data:', error);
				  // Handle error
				}
			  );
		}
	  }
}
