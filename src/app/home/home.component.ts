import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras} from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users: any[] = []; 
  subscription : Subscription;
  constructor(private userService: UserService, private router: Router) { 
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe(
      (responseData) => {
        var userId = localStorage.getItem('userId');
        for(var i=0;i<responseData.length; i++){
          if(responseData[i].id == userId){
            continue;
          }
          else{
            this.users.push(responseData[i])
          }
        }
        console.log("Users:", this.users);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  updateUser(user: any){
    console.log("updateuser:", user);
    const navigationExtras: NavigationExtras = {
      state: {
        myData: user // Pass your data object here
      }
    };
    // this.router.navigate(['/update'], navigationExtras);
    this.router.navigate(['/update'], { queryParams: { data: JSON.stringify(user) } });
  }

  approveUser(user: any){
    console.log("updateuser:", user);
    user.isApproved = true;
    user.approvedBy = localStorage.getItem('userId');
    var result = confirm("Are you sure you want to approve user?")
    if (result) {
      this.userService.updateUser(user).subscribe(
        (response) => {
          console.log('Data updated successfully:', response);
          window.alert('User approved successfully');
          this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error updating data:', error);
      }
    );
      console.log('User clicked Yes');
    } else {
      console.log('User clicked No or closed the dialog');
    }
  }
}
