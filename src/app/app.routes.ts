import { Routes } from '@angular/router';
import { AddBookComponent } from './features/books/pages/add-book/add-book.component';
import { UpdateBookComponent } from './features/books/pages/update-book/update-book.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { HomepageComponent } from './features/home/pages/homepage/homepage.component';
import { RegisterComponent } from './features/auth/pages/regestration/register.component';
import { BooksComponent } from './features/books/components/book-display/book-display';

export const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:RegisterComponent },
  {
    path: 'books',
   // canActivate: [authGuard],
    title: 'App | books',
    children: [
       {
        path: '', 
        component: BooksComponent,
      },
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
  { path: '**', redirectTo: '' },
];
