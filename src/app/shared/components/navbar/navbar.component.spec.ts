import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule]
})
export class NavbarComponent {
  isLoggedIn = true;

  // constructor(private authService: AuthService, private router: Router) {
  //   this.authService.isLoggedIn$.subscribe(status => {
  //     this.isLoggedIn = status;
  //   });
  // }

  logout() {
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
