import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(private router: Router) {}

  goToBooks() {
    this.router.navigate(['/books']);
  }
}
