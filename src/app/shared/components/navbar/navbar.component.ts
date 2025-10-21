import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink],
})
export class NavbarComponent {
  isLoggedIn = false;
  role: string | null = '';
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.role = this.authService.getUserRole();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
