import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import User from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/register';
  private loginUrl = 'https://nodejs-bookstore-api-vercel.vercel.app/login';
  private usersUrl =
    'https://nodejs-bookstore-api-vercel.vercel.app/api/u/users';
  loggedUser: User | null = null;

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  users = [
    {
      username: 'test',
      password: 'test',
    },
  ];
  // getAllUsers(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }
  getAllUsers(): Observable<any> {
    return this.http.get(this.usersUrl);
  }

  loginAuth(user: User) {
    this.getAllUsers().subscribe((userArr: any) => {
      const foundUser = userArr.find(
        (dbUser: any) => user.username === dbUser.username
      );
      if (!foundUser) {
        console.log('user not found');
        return;
      }
      if (foundUser.password === user.password) {
        this.loggedUser = Object(JSON.stringify(user));
        console.log('Login Successful:\n', this.loggedUser);
        localStorage.setItem('token', 'dummy-jwt-token');
        this.loggedIn.next(true);
        // localStorage.setItem('username', user.username);
        this.router.navigate(['']);
      }
    });
  }
  registerUser(newUser: User): Observable<any> {
    return this.http.post(this.apiUrl, newUser);
  }
}
