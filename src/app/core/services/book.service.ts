import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Book from '../../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBookById(bookId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/books/${bookId}`);
  }

  addBook(book: Book): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  updateBook(id: string, newBookProps: object): Observable<any> {
    return this.http.patch(`http://localhost:3000/books/${id}`, newBookProps);
  }
}
