import { Component, OnInit } from '@angular/core';
import { BookFormComponent } from '../../components/book-form/book-form.component';
import { BookService } from '../../../../core/services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Book from '../../../../models/book.model';

@Component({
  selector: 'app-add-book',
  imports: [BookFormComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  operation: string = 'Add Book';

  constructor(private bookService: BookService) {}
  addBook(book: Book) {
    console.log(book);
    this.bookService.addBook(book).subscribe((data) => {
      console.log('Added Book:\n', data);
    });
  }
}
