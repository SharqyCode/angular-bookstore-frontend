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
  private usersUrl = 'https://nodejs-bookstore-api-vercel.vercel.app/api/u/users';

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

  /** Authenticate login */
  loginAuth(user: User) {
    this.getAllUsers().subscribe({
      next: (userArr: any[]) => {
        const foundUser = userArr.find(
          (dbUser: any) => user.username === dbUser.username
        );

        if (!foundUser) {
          console.log('❌ User not found');
          return;
        }

        if (foundUser.password === user.password) {
          this.loggedUser = foundUser;
          console.log('✅ Login successful:', this.loggedUser);

          localStorage.setItem('token', 'dummy-jwt-token');
          localStorage.setItem('username', foundUser.username);

          this.loggedIn.next(true);
          this.router.navigate(['/books']);
        } else {
          console.log('❌ Incorrect password');
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
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
