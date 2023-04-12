import { createFeatureSelector, createSelector } from '@ngrx/store';

import { I_BooksState } from 'src/app/interfaces/book/booksState.interface';

// isLoading
export const isLoadingSelector = createSelector(
  createFeatureSelector('books'),
  (state: I_BooksState) => state.isLoading
);

// books
export const booksSelector = createSelector(
  createFeatureSelector('books'),
  (state: I_BooksState) => state.books
);

// error
export const errorSelector = createSelector(
  createFeatureSelector('books'),
  (state: I_BooksState) => state.error
);

// latest Book
export const latestBookSelector = createSelector(
  createFeatureSelector('books'),
  (state: I_BooksState) => state.books[state.books.length - 1]
);
