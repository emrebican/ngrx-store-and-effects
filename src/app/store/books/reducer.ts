import { createReducer, on } from '@ngrx/store';

import * as BooksActions from './actions';
import { I_BooksState } from 'src/app/interfaces/book/booksState.interface';

const initialState: I_BooksState = {
  isLoading: false,
  books: [],
  error: null
};

export const booksReducer = createReducer(
  initialState,

  // isLoading
  on(BooksActions.getBooks, (state) => ({
    ...state,
    isLoading: true
  })),

  // getBooks success
  on(BooksActions.getBooksSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    books: action.books
  })),

  // getBooks failure
  on(BooksActions.getBooksFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),

  // add Book
  on(BooksActions.addBook, (state, action) => ({
    ...state,
    books: [
      ...state.books,
      { id: new Date().getTime(), title: action.title, completed: false }
    ]
  })),

  // remove Book
  on(BooksActions.removeBook, (state, action) => ({
    ...state,
    books: state.books.filter((book) => book.id !== action.id)
  })),

  // complete Book
  on(BooksActions.completeBook, (state, action) => ({
    ...state,
    books: state.books.map((book) =>
      book.id === action.id ? { ...book, completed: !book.completed } : book
    )
  }))
);
