import { Routes } from '@angular/router';
import { AddBookComponent } from './features/books/pages/add-book/add-book.component';

export const routes: Routes = [
  {
    path: 'books',
    title: 'App | books',
    component: AddBookComponent,
  },
];
