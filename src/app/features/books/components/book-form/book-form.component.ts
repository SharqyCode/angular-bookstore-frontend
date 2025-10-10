import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../../../core/services/book.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent {
  bookForm!: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: [uuidv4()],
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', Validators.required],
      publishedYear: ['', [Validators.pattern('^[0-9]{4}$')]],
      description: [''],
    });
  }

  onSubmit() {
    console.log('submit');

    this.bookService.addBook(this.bookForm.value).subscribe((data) => {
      console.log('Added Book:\n', data);
    });
    this.bookForm.reset();
  }
}
