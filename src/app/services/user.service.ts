import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  
    constructor(private http: HttpClient, private router: Router) { }

    getUsers(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:3000/user/')
    }
    
    updateUser(user: any): Observable<any>{
      return this.http.put('http://localhost:3000/user/'+user.id, user);
    }

}