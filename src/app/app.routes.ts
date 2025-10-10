import { Routes } from '@angular/router';
import { AddBookComponent } from './features/books/pages/add-book/add-book.component';
import { UpdateBookComponent } from './features/books/pages/update-book/update-book.component';

export const routes: Routes = [
  {
    path: 'books',
    title: 'App | books',
    children: [
      {
        path: 'add',
        component: AddBookComponent,
      },
      {
        path: 'update/:id',
        component: UpdateBookComponent,
      },
    ],
  },
];
