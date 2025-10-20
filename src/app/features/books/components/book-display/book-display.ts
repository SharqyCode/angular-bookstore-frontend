import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../../app/core/services/book.service';
import Book from '../../../../models/book.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-display.html',
  styleUrls: ['./book-display.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  errorMessage = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log(data[0].bookId);
        this.books = data;

        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to load books';
        this.loading = false;
      },
    });
  }
  deleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter((b) => b.bookId !== id);
        },
        error: (err) => {
          console.error('Error deleting book:', err);
          alert('Failed to delete book');
        },
      });
    }
  }
}
