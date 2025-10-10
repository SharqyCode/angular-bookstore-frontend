import { Component } from '@angular/core';
import { BookFormComponent } from '../../components/book-form/book-form.component';

@Component({
  selector: 'app-add-book',
  imports: [BookFormComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {}
