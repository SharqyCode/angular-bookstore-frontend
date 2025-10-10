import { Component, inject, OnInit } from '@angular/core';
import { BookFormComponent } from '../../components/book-form/book-form.component';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../../core/services/book.service';
import Book from '../../../../models/book.model';

@Component({
  selector: 'app-update-book',
  imports: [BookFormComponent],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css',
})
export class UpdateBookComponent implements OnInit {
  operation: string = 'Update Book';
  route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
  bookToUpdate!: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBookById(this.id!).subscribe((book) => {
      this.bookToUpdate = book;
    });
  }

  updateBook(bookProps: object) {
    console.log('Updating Book...');
    this.bookService.updateBook(this.id!, bookProps).subscribe((data) => {
      console.log('Updated Book:\n', data);
    });
  }
}
