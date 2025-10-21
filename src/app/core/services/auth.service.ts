import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import User from '../../models/user.model';
import { Router } from '@angular/router';
import DecodedToken from '../../models/jwt.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `http://localhost:5000/api/u`;
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
    // return this.http.get(this.usersUrl);
    return this.http.get(`${this.baseUrl}/users`);
  }

  /** Register new user */
  registerUser(newUser: User): Observable<any> {
    // return this.http.post(this.apiUrl, newUser);
    return this.http.post(`${this.baseUrl}/register`, newUser);
  }
  loginUser(loggingUser: User): Observable<any> {
    // return this.http.post(this.loginUrl, loggingUser);
    return this.http.post(`${this.baseUrl}/login`, loggingUser);
  }

  /** Authenticate login */
  loginAuth(user: User): Observable<any> {
    return this.loginUser(user).pipe(
      tap((res) => {
        const token = res.token;
        localStorage.setItem('token', token);
        this.loggedUser = user;
        this.loggedIn.next(true);
      })
    );
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

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role;
  }
}
