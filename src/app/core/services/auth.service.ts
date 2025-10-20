import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import User from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =
    'https://nodejs-bookstore-api-vercel.vercel.app/api/u/register';
  private loginUrl =
    'https://nodejs-bookstore-api-vercel.vercel.app/api/u/login';
  private usersUrl =
    'https://nodejs-bookstore-api-vercel.vercel.app/api/u/users';

  loggedUser: User | null = null;

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Ensure login state persists after refresh
    this.checkLoginStatus();
  }

  /** Get all users from backend */
  getAllUsers(): Observable<any> {
    return this.http.get(this.usersUrl);
  }

  /** Register new user */
  registerUser(newUser: User): Observable<any> {
    return this.http.post(this.apiUrl, newUser);
  }
  loginUser(loggingUser: User): Observable<any> {
    return this.http.post(this.loginUrl, loggingUser);
  }

  /** Authenticate login */
  loginAuth(user: User) {
    this.loginUser(user).subscribe({
      next: (res) => {
        // const foundUser = userArr.find(
        //   (dbUser: any) => user.username === dbUser.username
        // );

        // if (!foundUser) {
        //   console.log('❌ User not found');
        //   return;
        // }

        // if (foundUser.password === user.password) {
        this.loggedUser = user;
        console.log('✅ Login successful:', this.loggedUser);

        localStorage.setItem('token', res.token);
        // localStorage.setItem('username', foundUser.username);

        this.loggedIn.next(true);
        this.router.navigate(['/books']);
        // } else {
        //   console.log('❌ Incorrect password');
        // }
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
    });
    return this.loginUser(user);
  }

  /** Logout user */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedUser = null;
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  /** Check login state (for navbar on page reload) */
  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.loggedIn.next(!!token);
  }
}
