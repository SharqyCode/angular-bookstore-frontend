import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser: User | null = null;
  private apiUrl = 'http://localhost:5000/register';
  constructor(private http: HttpClient, private router: Router) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  loginAuth(user: User) {
    this.getAllUsers().subscribe((users: User[]) => {
      const foundUser = users.find(
        (dbUser) => user.username === dbUser.username
      );
      if (!foundUser) {
        console.log('user not found');
        return;
      }
      if (foundUser.password === user.password) {
        this.loggedUser = Object(JSON.stringify(user));
        console.log('Login Successful:\n', this.loggedUser);
        localStorage.setItem('username', user.username);
        this.router.navigate(['']);
      }
    });
  }
  registerUser(newUser: User): Observable<any> {
  return this.http.post(this.apiUrl, newUser);
}

}
