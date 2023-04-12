import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BooksActions from '../store/books/actions';
import {
  booksSelector,
  errorSelector,
  isLoadingSelector
} from '../store/books/selectors';

import { I_BooksState } from '../interfaces/book/booksState.interface';
import { I_Book } from '../interfaces/book/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  books$!: Observable<I_Book[]>;
  error$!: Observable<string | null>;

  form!: FormGroup;

  constructor(private store: Store<I_BooksState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.books$ = this.store.select(booksSelector);
    this.error$ = this.store.select(errorSelector);

    // isLoading prop == true
    this.store.dispatch(BooksActions.getBooks());

    // form
    this.form = new FormGroup({
      title: new FormControl(null)
    });
  }

  onAddBook() {
    this.store.dispatch(
      BooksActions.addBook({
        title: this.form.value.title
      })
    );

    this.form.reset();
  }

  onRemoveBook(id: number) {
    this.store.dispatch(BooksActions.removeBook({ id }));
  }

  onCompleteBook(book: I_Book) {
    this.store.dispatch(BooksActions.completeBook({ ...book }));
  }
}
