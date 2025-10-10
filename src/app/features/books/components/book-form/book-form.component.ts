import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../../../core/services/book.service';
import { v4 as uuidv4 } from 'uuid';
import Book from '../../../../models/book.model';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent implements OnInit, OnChanges {
  @Input() operation: string = '';
  @Input() bookToUpdate: Book | null = null;
  @Output() submitFormEvent = new EventEmitter<any>();
  bookForm!: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: [uuidv4()],
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', Validators.required],
      publishingYear: ['', [Validators.pattern('^[0-9]{4}$')]],
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookToUpdate'] && this.bookToUpdate) {
      this.bookForm.patchValue(this.bookToUpdate);
    }
  }

  onSubmit() {
    console.log('Form Submit');
    if (this.bookForm.valid) {
      this.submitFormEvent.emit(this.bookForm.value);
      this.bookForm.reset();
    } else {
      return;
    }
  }
}
